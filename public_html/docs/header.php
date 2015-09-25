<!DOCTYPE HTML>
<html>
<head>
	<title><?php if(isset($page['title'])){ echo $page['title'].' | '; } ?>MultiQC</title>
	<meta name="description" content="MultiQC: a tool to aggregate bioinformatics results across many samples into a single report.">
  		<meta name="author" content="Phil Ewels">
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
	<link rel="stylesheet" href="<?php echo $dots; ?>assets/css/main.css" />
	<!--[if lte IE 8]><link rel="stylesheet" href="<?php echo $dots; ?>assets/css/ie8.css" /><![endif]-->
	<!--[if lte IE 9]><link rel="stylesheet" href="<?php echo $dots; ?>assets/css/ie9.css" /><![endif]-->
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo $dots; ?>images/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo $dots; ?>images/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $dots; ?>images/favicon-16x16.png">
</head>
<body id="top" class="mqc_docs">

	<!-- Header -->
	<header id="header" style="height: 350px; min-height: 350px; padding-bottom:0;">
		<div class="content">
			<h1><img src="<?php echo $dots; ?>images/MultiQC_logo_inverted.png" title="MultiQC" style="max-width:100%;"></h1>
			<p>MultiQC v<?php echo $page['version']; ?> Documentation</p>
			
			<?php if(count($page['nav']) > 0){ ?>
			<nav id="nav" role="navigation">
				<ul>
					<?php foreach ($page['nav'] as $url => $name){
						echo '<li><a href="/docs/'.$page['version'].'/'.$url.'/">'.$name.'</a></li>'."\n";
					} ?>
					<li><a href="https://github.com/ewels/MultiQC/releases/">Download</a></li>
				</ul>
			</nav>
			<?php } ?>
			
		</div>
	</header>

<main class="wrapper">
	<section class="inner <?php if(isset($page['layout']) && $page['layout'] == 'toc'){ echo 'mainpage-toc'; } ?>">