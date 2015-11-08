<?php
// Scrape PyPI Downloads

// PyPI has a JSON api that gives total download counts, but no breakdown
// beyond that. This script runs on a cron job to collect that information
// every day so that we can plot the package's popularity over time.

// First, get the JSON. Version 0.1 is first upload, but has stats for all versions
$json = file_get_contents('https://pypi.python.org/pypi/multiqc/0.1/json');
$data = json_decode($json);

// Connect to the database
$dbconfig = parse_ini_file("config.ini");
$db = new mysqli('localhost', $dbconfig['user'], $dbconfig['password'], $dbconfig['db']);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

// Parse the JSON and count the downloads
foreach ($data->releases as $version => $release){
    $v = $db->real_escape_string($version);
    $dl = 0;
    // Supplied as an array, but usually one entry.
    foreach ($release as $r){
        $dl += intval($r->downloads);
    }
    // Insert into the database
    $sql_insert = $db->prepare("INSERT INTO `pypi_downloads` (`version`, `downloads`) VALUES (?, ?)");
    $sql_insert->bind_param('si', $v, $dl);
    $sql_insert->execute();
}

$db->close();