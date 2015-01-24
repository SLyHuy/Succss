#!/bin/sh
echo
echo "add with configuration default values and  multiple filters and captures fake optionnal"
succss add selftests/data-defaults.js --pages=defaults,home --captures=body,homebody,fake --viewports=default
echo
echo "check with default values and no filters"
succss check selftests/data-defaults.js
echo
echo "single filter, custom configuration and rmtree option"
succss add selftests/data.js --pages=advanced-selectors --rmtree
echo
echo "check with a filter, imagediff (default) and resemble (optional)"
succss check selftests/data.js --pages=advanced-selectors --resemble
echo
echo "Writing small diff images with minimum width"
succss add selftests/data.js --pages=diffCanvas
succss check selftests/data-diff.js --pages=diffCanvas
echo
echo with static images comparison
succss check selftests/data.js --pages=diffCanvas --checkDir=selftests/static-images
echo
echo phantom base, phantom matches, slimer diff
succss add selftests/data-diff.js --pages=installation
succss check selftests/data-diff.js --pages=installation --diff=false --good
succss check selftests/data-diff.js --pages=installation --engine=slimerjs
echo
echo slimer base, phantom diff, slimer matches
succss add selftests/data-diff.js --pages=installation --engine=slimerjs
succss check selftests/data-diff.js --pages=installation
succss check selftests/data-diff.js --pages=installation --engine=slimerjs --diff=false --good
