##ROCKCSS - base on SUCCSS, a CSS Regression testing tool

Customized & optimized from SUCCSS (Find more: http://succss.ifzenelse.net)

###Install
#####```$ sudo npm install -g rockcss```

###Support
1. Flow testing.
2. Allow cookies.
3. SSL and https protocol.
4. Visual report (Using template from BackStopJS - https://github.com/garris/BackstopJS)

###How to use?
Add reference screenshots

#####```$ rockcss add your-test.js```

After you change something in js/css code and complete your task. Let tun test again and check:

#####```$ rockcss check your-test.js```

If you want see a visual report:

Copy `report.js` and `report folder` inside `/report_server` to your folder have file `your-test.js` and run command:

#####```$ node report.js -t 60```

`-t 60` is time of server will alive in 60 mins. Default is 15 mins. After this time, server will automating shutdown. But you can start it again, it's not delete last checking data.

Open web browser at one of address in command line and see result. One of default address maybe:

``` http://localhost:3000/ ```


###How to config (make your-test.js)
- Check document from Sucss: http://succss.ifzenelse.net
- New configs:
  
  Under Succss.pages['name-page']:
      
      1. `hidden`           - String css3 of hidden Element.
      2. `beforeTest(url)`  - Function: with `url` is variable of url of this page.
  
  Under Succss.page['name-page'].captures:
      
      1. `before`           - Function: call before capture.
      2. `sAfter`           - Function: call after captured.

- Example:

```javascript
Succss.pages = {
    'home': {
        url: 'http://google.com/',
        directory: 'screenshots/' + 'home',
        hidden: '#ydtb-toolbar', //Hide Yii debug toolbar
        beforeTest: function() {
            var me = this;
            me.click({
                type: 'xpath',
                path: '//*[contains(concat(" ", @class, " "), " sidebar__list ")]//a[2]'
            });
        },
        captures: {
            'header': {
                selector: '.header.header-new'
            },
            'popup-login': {
                selector: {
                    type: 'xpath',
                    path: "//*[@id='fb-connect-popup']/../..",
                },
                before: function() {
                    var me = this;
                    me.click('.header-authentication-popup[data-authen="0"]');
                    me.wait(3000);
                },
                sAfter: function() {
                    var me = this;
                    me.click('.nyroModalClose.nyroModalCloseButton');
                    me.wait(1000);
                }
            },
            'checkout': {
                selector: 'body',
                before: function() {
                    var me = this;
                    me.evaluate(function() {
                        var input = $('#usernotregister').find('input');
                        input[0].checked = true;
                        input.change();
                    });
                    me.wait(100);

                    me.sendKeys('#EmailLoginForm_email', Config.emailLogin); // Fill your email address to login
                    me.sendKeys('#EmailLoginForm_password', Config.passwordLogin); // Fill your password to login

                    me.click('button.submit_btn.login_btn');
                    me.wait(5000);

                    me.waitForSelector('#page', function() {
                        console.log('Open checkout page successfully!');
                        me.wait(1000);

                        me.evaluate(function(selector) {
                            $(selector).remove();
                        }, '.adv');

                    }, function() {
                        console.log('Open checkout page failed!');
                    });
                }
            }

        }
    },
    'another-page': {}
}
```

####Built with:
- CasperJS
- Imagediff
- ResembleJS
- PhantomJS
- NodeJS
- Express
- MIT Licenses
- Thanks to them!

