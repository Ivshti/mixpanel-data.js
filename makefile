
all: build

build:
	./node_modules/.bin/browserify ./mixpanel-data.js -s mxData --debug | ./node_modules/.bin/exorcist mixpanel-data.browser.js.map > mixpanel-data.browser.js
