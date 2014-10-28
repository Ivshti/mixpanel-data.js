
all: build

build:
	./node_modules/.bin/browserify ./mixpanel-data.js -s mxData --debug | ./node_modules/.bin/exorcist mixpanel-data.browser.js.map > mixpanel-data.browser.js
	./node_modules/.bin/uglifyjs ./mixpanel-data.browser.js --in-source-map mixpanel-data.browser.js.map --source-map mixpanel-data.browser.min.js.map > mixpanel-data.browser.min.js
