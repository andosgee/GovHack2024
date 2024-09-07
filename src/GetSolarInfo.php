<?php

class GetSolarInfo
{

    private $lat;
    private $lng;
    private $formattedAddress;
    private $roofAngle;
    private $panelDirection;

    private $image;
    // the Monthly-mean Hourly Radiation Table
    private $mhrTable;
    // the Typical Meteorological Year Table
    private $tmyTable;

    public function __construct($lat, $lng, $formattedAddress, $roofAngle = null, $panelDirection = null)
    {
        $this->lat = $lat;
        $this->lng = $lng;
        $this->formattedAddress = $formattedAddress;
        $this->roofAngle = $roofAngle;
        $this->panelDirection = $panelDirection;
    }

    function curl() {
        $data = [
            "latitude" => $this->lat,
            "longitude" => $this->lng,
            "location_name" => $this->formattedAddress
        ];

        if ($this->roofAngle !== null) {
            $data["panel_tilt"] = $this->roofAngle;
        }

        if ($this->panelDirection !== null) {
            $data["panel_bearing"] = $this->panelDirection;
        }

// Convert data to JSON format
        $jsonData = json_encode($data);

// Initialize cURL session
        $ch = curl_init('https://api.niwa.co.nz/solarview/generate');

// Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($jsonData),
            'x-apikey: '
        ]);

// Execute cURL request and get the response
        $response = curl_exec($ch);

// Check for cURL errors
        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            die('Curl error: ' . $error);
        }

// Close cURL session
        curl_close($ch);

// Handle the response
        return json_decode($response, true);
    }

    // Don't have valid API key so using a hardcoded response that can be gotten from their website.
    function hcCurl() {
        $response = json_decode('{
  "input_values": {
    "latitude": -43.5354382,
    "longitude": 172.6320212,
    "panel_bearing": 0,
    "location_name": "104 Tuam Street",
    "images": []
  },
  "assets": [
    {
      "type": "image/png",
      "key": "solarview-plot",
      "url": "https://s3.ap-southeast-2.amazonaws.com/prod.solarview-api.niwa/9ca21e8728d67f090189395a6f9a0b54/image.png",
      "description": "SolarView Plot"
    },
    {
      "type": "text/csv",
      "key": "mhr-table",
      "url": "https://s3.ap-southeast-2.amazonaws.com/prod.solarview-api.niwa/9ca21e8728d67f090189395a6f9a0b54/table_mhr.csv",
      "description": "Monthly-mean Hourly Radiation Table"
    },
    {
      "type": "text/csv",
      "key": "tmy-table",
      "url": "https://s3.ap-southeast-2.amazonaws.com/prod.solarview-api.niwa/9ca21e8728d67f090189395a6f9a0b54/table_tmy.csv",
      "description": "Typical Meteorological Year Table"
    }
  ]
}', true);

        $this->image = $response['assets'][0]['url'];
        $this->mhrTable = $response['assets'][1]['url'];
        $this->tmyTable = $response['assets'][2]['url'];

        return $response;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getMhrTable()
    {
        return $this->mhrTable;
    }

    public function getTmyTable()
    {
        return $this->tmyTable;
    }

    public function getYearlykWperm2()
    {

        $months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        $monthData = [];

        $file = fopen($this->mhrTable, 'r');
        for ($i = 0; $i < 12; $i++) {
            fgetcsv($file);
        }
        foreach ($months as $month) {
            $data = [0,0];
            for ($hour = 0; $hour < 24; $hour++) {
                if (($line = fgetcsv($file)) !== FALSE) {
                    $data[0] += floatval($line[3])/1000.0;
                    $data[1] += floatval($line[5])/1000.0;
                }
            }
            $monthData[$month] = $data;
        }
        return $monthData;
    }

}
