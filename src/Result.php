<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GovHack Solar Calculator</title>
    <link rel="stylesheet" href="styles.css">
    <!--    <script src="scripts.js" defer></script>-->
</head>
<body id="results">
<div id="content">
    <div class="button-container">
        <a href="index.html" class="button-link">Go Back to Form</a>
    </div>
    <?php
    // Result.php
    $superSecretGoogleAPIKey = "AIzaSyDuC96XOlo4Xzq1k70CasTLwzYtM3AyLTg";

    // Retrieve and sanitize form data
    $address = $_POST['address'];
    $roofAngle = $_POST['roofAngle'] != '' ? floatval($_POST['roofAngle']) : true;
    $panelDirection = $_POST['panelDirection'] != '' ? floatval($_POST['panelDirection']) : 0;
    $areaOfPanels = $_POST['areaOfPanels'] != '' ? floatval($_POST['areaOfPanels']) : 1;
    $avgkWh = floatval($_POST['avgkWh']);
    $avgCostPerUnit = floatval($_POST['avgCost']);
    $costOfSystem = $_POST['costOfSetup'] != '' ? floatval($_POST['costOfSetup']) : false;


    // Prepare the address for the Google Maps API
    $address = urlencode($address);

    // Call the Google Maps API
    $geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=$address&key=$superSecretGoogleAPIKey");
    $results = json_decode($geocode, true)["results"];

    $formattedAddress = $results[0]['formatted_address'];

    $address = explode(',', $formattedAddress)[0];

    // Extract the latitude and longitude from the results
    $lat = $results[0]['geometry']['location']['lat'];
    $lng = $results[0]['geometry']['location']['lng'];

    $googleSolarRequest = curl_init("https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$lat&location.longitude=$lng&requiredQuality=MEDIUM&key=$superSecretGoogleAPIKey");
    curl_setopt($googleSolarRequest, CURLOPT_RETURNTRANSFER, true);

    $googleSolarInfo = curl_exec($googleSolarRequest);;
    curl_close($googleSolarRequest);
    $googleSolarInfo = json_decode($googleSolarInfo, true);
    //var_dump($googleSolarInfo["error"]);
    if (!array_key_exists("error", $googleSolarInfo)) {
        $solarPotential = $googleSolarInfo["solarPotential"];
        $maxArrayPanelCount = $solarPotential["maxArrayPanelsCount"];
        $maxArrayArea = $solarPotential["maxArrayAreaMeters2"];
        $wholeRoofArea = $solarPotential["wholeRoofStats"]["areaMeters2"];

    } else {
        $googleSolarRequest = false;
    }


    if ($roofAngle) $roofAngle = $lat;

    echo "<h1 class='no-p'>Solar Data for $address</h1>";
    echo "<p class='no-p'>($formattedAddress)</p>";
    //echo "<h2>Address</h2>";
    //echo "<p>$formattedAddress</p>";

    echo "<h2>Latitude and longitude of $address</h2>";

    echo "<div class='flex-container'>";
    echo "<p class='no-p'><strong>Latitude:</strong> $lat</p>";
    echo "<p class='no-p'><strong>Longitude:</strong> $lng</p>";
    echo "</div>";
    // Display the Google Map
    ?>
    <iframe
            width="600"
            height="400"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
    <?php
    echo "src=\"https://www.google.com/maps/embed/v1/place?key=$superSecretGoogleAPIKey&q=$lat,$lng&zoom=17&maptype=satellite\"";
    echo '>';
    echo '</iframe>';
    echo "<p style='font-size: 0.5em'>Sorry you cannot change location of data from changing the map.</p>";
    // Get solar data
    require 'GetSolarInfo.php';
    $solarInfo = new GetSolarInfo($lat, $lng, $address, $roofAngle, $panelDirection);
    //Purely while api key does not work, if address entered corresponds to hard code will return otherwise random
    //TODO replace when api work
    $rand = rand(0, 1);
    if (($address == "104 Tuam Steet" && $address != "10 Hadfield Place") || $rand == 0) {
        $responseData = $solarInfo->hcCurl();
    } else {
        $responseData = $solarInfo->hcCurl2();
    }

    if ($googleSolarRequest !== false):
        ?>
        <h2 class="no-p">Roof Information from Google Solar API</h2>
        <p class="no-pb">According to Google the roof at <?php echo $address ?> has:</p>


        <div class="list">
            <ul>
                <li>A total area of <?php echo number_format($wholeRoofArea, 2) ?>m<sup>2</sup></li>
                <li>The ability to have <?php echo $maxArrayPanelCount ?> solar panels on it</li>
                <li>Which covers an area of <?php echo number_format($maxArrayArea, 2) ?>m<sup>2</sup></li>
            </ul>
        </div>

        <!--Google solar api has the ability to map out the roof with each roof section providing an azimuth and pitch Adding in that information in a nice easy presentable way would be cool but out of my ability-->

        <p>The amount of panel area entered was <?php echo $areaOfPanels ?>m<sup>2</sup> which
            is <?php echo number_format($maxArrayArea - $areaOfPanels, 2) ?>m<sup>2</sup> off the max predicted by
            Google Solar API</p>
    <?php endif; ?>
    <h2 class="no-p">Info from NIWA Solar API</h2>
    <p>Data gathered from the <?php print_r($solarInfo->getWeatherStation()) ?></p>

    <img style="max-width: 100%" src="<?php echo $solarInfo->getImage(); ?>" alt="Solar time map">
    <p>Image and data gotten from <a href="https://niwa.co.nz/">NIWA, the National Institute of Water and Atmospheric
            Research</a></p>

    <h3 class="no-p">How to understand this</h3>
    <div class="paragraph">
        <p>This graph shows how much power a solar panel will generate in kWh/m<sup>2</sup>. There is no way to use
            custom
            solar panel areas for this graph, that is taken into account below.</p>
        <p>This means that each meter square of solar panels will generate this much kW-hr (power unit) cumulatively
            over
            the day.</p>
        <p>The values get read right to left, and shows the time of day under the line in NZST.</p>
        <p>The different coloured lines are different times of the year with the date on the bottom and shows how solar
            output differs with the different seasons and length of daylight.</p>
        <p>This does not take into account shadows cast by neighbours or object (e.g. trees). The graph can be used to
            calculate that further as shown <a href=https://niwa.co.nz/solarview-example>here</a></p>
        <p>For more information on how to read this graph, please visit <a href=https://niwa.co.nz/solarview-example>https://niwa.co.nz/solarview-example</a>
        </p>
    </div>
    <h2 class="no-p">Results</h2>
    <div class="paragraph">
        <?php
        $powerCalc = $solarInfo->getDaykWperm2PerMonth();
        //print_r($powerCalc);


        echo "<p>The table below is an estimate on the power output in kW of $areaOfPanels meter squared solar panels for your location.</p>";
        echo "<p>The table shows the average power generated by $areaOfPanels<sup>2</sup> at your location per day every month.</p>";
        echo "<p>Each month may show a different amount due to the different seasons and lengths of day.</p>";
        echo "<p>The kWh is calculated by taking the kW and dividing by 24 (hours in the day), this is presuming that battery storage is also set up to make use of the solar energy at night.</p>";
        echo "<p>This does not take into account power sold back to the power company when overproducing power</p>";
        //echo "<p>In a perfect world with no clouds it is estimated to generate roughly $yearlyPower[1]kW of power per meter squared of solar panels that you have";

        $totalAvgkW = 0;
        $totalkWhGen = 0;
        $totalkWhFromGrid = 0;
        $totalLeftCost = 0;
        $totalSavings = 0;

        // totals for calcuations in graph
        ?>
    </div>

    <div class="table-frame">
        <div class="table-container">
            <table>
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Average</th>
                    <th>kWh generated</th>
                    <th>est. kWh from grid</th>
                    <th>cost of kWh from grid</th>
                    <th>Power Savings</th>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach ($powerCalc as $month => $data) {
                    $avgkW = floatval($data[0]) * $areaOfPanels;
                    $kWhGen = $avgkW / 24;
                    $kWhFromGrid = max($avgkWh - $kWhGen, 0);
                    $leftCost = $kWhFromGrid * $avgCostPerUnit;
                    $savings = $kWhGen * $avgCostPerUnit;

                    $totalAvgkW += $avgkW;
                    $totalkWhGen += $kWhGen;
                    $totalkWhFromGrid += $kWhFromGrid;
                    $totalLeftCost += $leftCost;
                    $totalSavings += $savings;

                    echo "<tr>";
                    echo "<td>$month</td>";
                    echo "<td>" . number_format($avgkW, 2) . "kW</td>";
                    echo "<td>" . number_format($kWhGen, 2) . "kWh</td>";
                    echo "<td>" . number_format($kWhFromGrid, 2) . "kWh</td>";
                    echo "<td>$" . number_format($leftCost, 2) . "</td>";
                    echo "<td>$" . number_format($savings, 2) . "</td>";
                    echo "</tr>";
                }
                ?>
                </tbody>
                <tfoot>
                <tr>
                    <th>Yearly totals</th>
                    <th><?php echo number_format($totalAvgkW / 12 * 365, 2); ?>kW</th>
                    <th><?php $yearlykWhGen = $totalkWhGen / 12 * 365;
                        echo number_format($yearlykWhGen, 2); ?>kWh
                    </th>
                    <th><?php echo number_format($totalkWhFromGrid / 12 * 365, 2); ?>kWh</th>
                    <th>$<?php echo number_format($totalLeftCost / 12 * 365, 2); ?></th>
                    <th>$<?php $yearlySavings = $totalSavings / 12 * 365;
                        echo number_format($yearlySavings, 2); ?></th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="paragraph">
        <?php
        echo "<p>With $areaOfPanels meters squared of solar panels on $address facing $panelDirection&deg; to North at tilted at " . abs($roofAngle) . "&deg; you could possibly save up to $" . number_format($yearlySavings, 2) . " a year in power costs.</p>";
        if ($costOfSystem !== false) {
            $payBackYears = $costOfSystem / $yearlySavings;
            echo "<h2>Return over Investment</h2>";
            echo "<p>With an upfront cost of $" . number_format($costOfSystem) . " it will take you " . number_format($payBackYears, 2) . " years to pay back your system.</p>";
            echo "<p>This does not account for power cost fluctuations, power being sold back to the power company, or inflation and presumes generation based on above data, and the exact daily usage provided.</p>";

        }

        echo "<h2>Long term savings</h2>";
        echo "<p>With an annual savings of $" . number_format($yearlySavings, 2) . " that means that in 20 years you could save $"
            . number_format($yearlySavings * 20 - $costOfSystem, 2) . " off your power bill" . (($costOfSystem !== false) ? " after the ROI" : "")
            . ", and have dropped your reliance on the grid by roughly " . number_format(($avgkWh * 365 - $yearlykWhGen) * 20, 2)
            . "kWh, which means that " . number_format(($yearlykWhGen / ($avgkWh * 365)) * 100, 2) . "% of your average power usage you are generating yourself .</p>";
        echo "<p>Note: This does not take into account any maintenance costs, inflation, cell degradation or battery degradation</p>"

        // TODO somehow add in environmental impact saved, probably from the amount of grid not being used and the data about amount of renewables not being used on the grid
        ?>

        <br>
        <hr>
        <p>All data on this page is highly estimated using real weather and sun data from NIWA, roof data from GOOGLE,
            and user provided values for power and solar array size. ACTUAL RESULTS MAY VARY.</p>
        <p>Usage is intended for a consumer household, while you can use this to estimate the output of a large solar
            farm you cannot estimate any costs from that.</p>
        <hr>
        <p>Image and data gotten from <a href='https://niwa.co.nz/'>NIWA, the National Institute of Water and
                Atmospheric Research</a></p>
        <p>Maps, latitude, longitude and roof data from Google<br>&copy; Samuel Douglas</p>
    </div>
    <p></p></div>
</body>
</html>
