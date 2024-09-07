<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GovHack Solar Calculator</title>
    <link rel="stylesheet" href="styles.css">
    <!--    <script src="scripts.js" defer></script>-->
</head>
<body>
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

// Prepare the address for the Google Maps API
$address = urlencode("$address");

// Call the Google Maps API
$geocode = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address=$address&key=$superSecretGoogleAPIKey");
$results = json_decode($geocode, true)["results"];

$formattedAddress = $results[0]['formatted_address'];

$address = explode(',', $formattedAddress)[0];

// Extract the latitude and longitude from the results
$lat = $results[0]['geometry']['location']['lat'];
$lng = $results[0]['geometry']['location']['lng'];

if ($roofAngle) $roofAngle = $lat;

echo "<h1>Solar Data</h1>";
echo "<h2>Address</h2>";
echo "<p>$formattedAddress</p>";

echo "<h2>Latitude and longitude</h2>";

//foreach ($results as $result) {
//    echo "<pre>",var_dump($result),"</pre>";
//}
//echo "<pre>",$results,"</pre>";

echo "<p><strong>Latitude:</strong> $lat</p>";
echo "<p><strong>Longitude:</strong> $lng</p>";

echo "<h2>Map</h2>";
// Display the Google Map
echo "<p>Sorry you cannot change location of data from changing the map.</p>";
?>
<iframe
    width="600"
    height="450"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
<?php
echo "src=\"https://www.google.com/maps/embed/v1/place?key=$superSecretGoogleAPIKey&q=$lat,$lng\"";
echo '>';
echo '</iframe>';

// Get solar data
require 'GetSolarInfo.php';
$solarInfo = new GetSolarInfo($lat, $lng, $address, $roofAngle, $panelDirection);
$responseData = $solarInfo->hcCurl();

echo "<h2>Info from Solar API</h2>";

echo "<img style='max-width: 100%' src=\"{$solarInfo->getImage()}\" alt=\"Solar time map\">";
echo "<p>Image and data gotten from <a href='https://niwa.co.nz/'>NIWA, the National Institute of Water and Atmospheric Research</a> </p>";

echo "<h3>How to understand this</h3>";
echo '<p>This graph shows how much power a solar panel will generate in kWh/m<sup>2</sup>. There is no way to use custom solar panel areas for this graph, that is taken into account below.</p>';
echo '<p>This means that each meter square of solar panels will generate this much kW-hr (power unit) cummitivly over the day.</p>';
echo '<p>The values get read right to left, and shows the time of day under the line in NZST.</p>';
echo '<p>The different coloured lines are different times of the year with the date on the bottom and shows how solar output differs with the different seasons and length of daylight.</p>';
echo '<p>This does not take into account shadows cast by neighbours or object (e.g. trees). The graph can be used to calculate that further as shown <a href="https://niwa.co.nz/solarview-example">here</a></p>';
echo '<p>For more information on how to read this graph, please visit <a href="https://niwa.co.nz/solarview-example">https://niwa.co.nz/solarview-example</a></p>';

echo '<h2>Results</h2>';
$powerCalc = $solarInfo->getYearlykWperm2();
//print_r($powerCalc);



echo "<p>The table below is an estimate on the power output in kW of $areaOfPanels meter squared solar panels for your location.</p>";
echo "<p>The table shows the estimated per day for each month, and it shows the average.</p>";
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

<table>
    <thead>
    <tr>
        <th>Month</th>
        <th>Average</th>
        <th>kWh generated</th>
        <th>est. kWh from grid</th>
        <th>cost of kWh from grid</th>
        <th>Savings</th>
    </tr>
    </thead>
    <tbody>
    <?php
    foreach ($powerCalc as $month => $data) {
        $avgkW = floatval($data[0]) * $areaOfPanels;
        $kWhGen = $avgkW / 24;
        $kWhFromGrid = $avgkWh - $kWhGen;
        $leftCost = ($avgkWh - $kWhGen) * $avgCostPerUnit;
        $savings = $kWhGen * $avgCostPerUnit;
        $kWhFromGrid = max($kWhFromGrid, 0);

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
        <th>Totals</th>
        <th><?php echo number_format($totalAvgkW/12 * 365, 2); ?>kW</th>
        <th><?php echo number_format($totalkWhGen/12 * 365, 2); ?>kWh</th>
        <th><?php echo number_format($totalkWhFromGrid/12 * 365, 2); ?>kWh</th>
        <th>$<?php echo number_format($totalLeftCost/12 * 365, 2); ?></th>
        <th>$<?php $yearlySavings =  $totalSavings/12 * 365;
            echo number_format($yearlySavings, 2); ?></th>
    </tr>
    </tfoot>
</table>

<?php
echo "<p>With $areaOfPanels meters squared of solar panels on your house facing $panelDirection&deg; to North at ".abs($roofAngle)."&deg; you could possibly save up to $".number_format($yearlySavings, 2)." a year in power costs.</p>"
?>

<p>Image and data gotten from <a href='https://niwa.co.nz/'>NIWA, the National Institute of Water and Atmospheric Research</a> </p>
</body>
</html>
