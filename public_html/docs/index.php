<!DOCTYPE HTML>
<html>
<head>
	<title>MultiQC</title>
	<meta name="description" content="MultiQC: a tool to aggregate bioinformatics results across many samples into a single report.">
  		<meta name="author" content="Phil Ewels">
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!--[if lte IE 8]><script src="../assets/js/ie/html5shiv.js"></script><![endif]-->
	<link rel="stylesheet" href="../assets/css/main.css" />
	<!--[if lte IE 8]><link rel="stylesheet" href="../assets/css/ie8.css" /><![endif]-->
	<!--[if lte IE 9]><link rel="stylesheet" href="../assets/css/ie9.css" /><![endif]-->
	<link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="../images/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png">
</head>

<body id="top" class="mqc_docs">

	<!-- Header -->
	<header id="header" style="height: 350px; min-height: 350px; padding-bottom:0;">
		<div class="content">
			<h1><img src="../images/MultiQC_logo_inverted.png" title="MultiQC" style="max-width:100%;"></h1>
			<p>MultiQC Documentation</p>
			
		</div>
	</header>

<main class="wrapper">
	<section class="inner">
		<h1>Welcome to the MultiQC Docs</h1>
		<p>You can find the documentation for all versions of MultiQC here <em>(you probably want the <a href="#">latest</a>)</em>.</p>
		<ul>
			<?php
			foreach (glob("../../multiqc/*") as $file) {
				$v = basename($file);
				echo '<li><a href="'.$v.'/README.md">Version '.$v.'</a></li>';
			}
			?>
		</ul>
	</section>
</main>

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
	<script src="../assets/js/jquery.min.js"></script>
	<script src="../assets/js/jquery.scrolly.min.js"></script>
	<script src="../assets/js/skel.min.js"></script>
	<script src="../assets/js/util.js"></script>
	<!--[if lte IE 8]><script src="../assets/js/ie/respond.min.js"></script><![endif]-->
	<script src="../assets/js/main.js"></script>

</body>
</html>