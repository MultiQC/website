<?php
// Plot PyPI Downloads

// Connect to the database
$dbconfig = parse_ini_file("../db_config.ini");
$db = new mysqli('localhost', $dbconfig['user'], $dbconfig['password'], $dbconfig['db']);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }

// Get the download stats
$dl_stats;
$versions;
$sql = "SELECT `time`, `version`, `downloads` FROM `pypi_downloads` ORDER BY `time` DESC, `version` DESC";
if(!$result = $db->query($sql)){ die('There was an error running the query [' . $db->error . ']'); }
while($r = $result->fetch_assoc()){
    $t = $r['time'];
    $v = $r['version'];
    $dl_stats[$t][$v] = $r['downloads'];
    $versions[$v] = true;
}

// Create the JSON strings needed by HighCharts
$categories = array_keys($dl_stats);
$series = [];
foreach(array_keys($versions) as $v){
    $data = [];
    foreach($categories as $t){
        $t_dl = isset($dl_stats[$t][$v]) ? intval($dl_stats[$t][$v]) : NULL;
        // Javascript uses milliseconds, so multiply timestamp by 1000
		array_push($data, array(strtotime($t)*1000, $t_dl));
    }
    array_push($series, array('name' => $v, 'data' => $data));
}
$series_json = json_encode($series);

?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>MultiQC</title>
		<meta name="description" content="MultiQC: a tool to aggregate bioinformatics results across many samples into a single report.">
        <meta name="author" content="Phil Ewels">
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
		<link rel="stylesheet" href="assets/css/main.css" />
		<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
		<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
		<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  		<link rel="icon" type="image/png" sizes="96x96" href="images/favicon-96x96.png">
  		<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
	</head>
	<body id="top">

		<!-- Header -->
		<header id="header" class="short">
			<div class="content">
				<h1><img src="images/MultiQC_logo_inverted.png" title="MultiQC" style="max-width:100%;"></h1>
				<p>PyPI Download Statistics</p>
			</div>
		</header>
			
		<!-- Four -->
		<section id="plots" class="wrapper style2 special">
			<header class="major">
				<h2>Stats from the <a href="https://pypi.python.org/pypi/multiqc">Python Package Index</a></h2>
				<p>Download counts collected daily from the PyPI JSON stats API.</p>
			</header>
			<div id="multiqc_pypi_downloads_plot"></div>
		</section>



		<!-- Footer -->
		<footer id="footer">
			<p class="copyright">Created by Phil Ewels:</p>
			<ul class="icons">
				<li><a href="https://github.com/ewels" class="icon fa-github"><span class="label">GitHub: @ewels</span></a></li>
				<li><a href="https://twitter.com/tallphil" class="icon fa-twitter"><span class="label">Twitter: @tallphil</span></a></li>
				<li><a href="https://se.linkedin.com/in/philewels" class="icon fa-linkedin"><span class="label">Instagram</span></a></li>
			</ul>
			<p class="copyright">Website theme: <a href="http://html5up.net">HTML5 UP</a></p>
		</footer>

		<!-- Scripts -->
		<script src="assets/js/jquery.min.js"></script>
		<script src="//code.highcharts.com/highcharts.js"></script>
		<script type="text/javascript">
		$(function () {
		    $('#multiqc_pypi_downloads_plot').highcharts({
		        chart: {
		            type: 'area'
		        },
		        title: {
		            text: 'MultiQC Downloads over time'
		        },
		        subtitle: {
		            text: 'https://pypi.python.org/pypi/multiqc'
		        },
		        xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						millisecond: '%e %b %Y, %H:%M',
						second: '%e %b %Y, %H:%M',
						minute: '%e %b %Y, %H:%M',
						hour: '%e %b %Y, %H:%M',
						day: '%e %b %Y',
						week: '%e %b %Y',
						month: '%b \'%y',
						year: '%Y'
		            }
		        },
		        yAxis: {
					min: 0,
		            title: {
		                text: 'Downloads'
		            },
		        },
		        tooltip: {
		            shared: true
		        },
		        plotOptions: {
		            area: {
		                stacking: 'normal',
		                lineColor: '#666666',
		                lineWidth: 1,
		                marker: {
		                    lineWidth: 1,
		                    lineColor: '#666666'
		                }
		            }
		        },
		        series: <?php echo $series_json; ?>
		    });
		});
		</script>
<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68098153-1', 'auto');
  ga('send', 'pageview');

</script>
	</body>
</html>