<?php
    $apiKey = 'AIzaSyCt0DCXuD4xix2zxotqjKEohje6AhES9rQ';
    $input = isset($_GET['input']) ? urlencode($_GET['input']) : '';

    $url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input={$input}&types=(regions)&components=country:ca&key={$apiKey}";
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    curl_close($ch);

    header('Content-Type: application/json');
    echo $response;
?>


