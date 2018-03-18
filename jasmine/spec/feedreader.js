/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('each feed has non empty url ', function () {
            for (var x = 0, len = allFeeds.length; x < len; x++) {
                var url = allFeeds[x].url;
                expect(url).toBeDefined();
                expect(url).not.toBe('');
            }
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('each feed has a non empty name', function () {
            for (var x = 0, len = allFeeds.length; x < len; x++) {
                var name = allFeeds[x].name;
                expect(name).toBeDefined();
                expect(name).not.toBe('');
            }
        });
      });


      /* Write a new test suite named "The menu" */
     describe('The menu', function () {

         /* Write a test that ensures the menu element is
          * hidden by default. You'll have to analyze the HTML and
          * the CSS to determine how we're performing the
          * hiding/showing of the menu element.
          */
         it('menu element is hidden by default', function () {
             expect($('.menu-hidden').is(':visible')).toBe(true);
         });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

         it('menu visible when clicked', function () {
             $('a.menu-icon-link').trigger('click');
             expect($('.menu-hidden').is(':visible')).toBe(false);
         });

         it('menu hidden when clicked', function () {
             $('a.menu-icon-link').trigger('click');
             expect($('.menu-hidden').is(':visible')).toBe(true);
         });
     });


    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loadFeed function called and is executed', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            // Invoking done
            done();
        });
      });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var f0,f1;
        beforeEach(function (done) {
            loadFeed(0, function () {
                // Get article header of the current feed
                f0 = $('.feed').find('h2')[0].innerText;
                // Invoke done
                done();
            });
        });

        // Change feed back to first
        afterEach(function (done) {
            loadFeed(0, done);
        });

        it('new feed is loaded and the content changes', function (done) {

            // Load new feed
            loadFeed(1, function () {
                // Get article header of new feed
                f1 = $('.feed').find('h2')[0].innerText;

                // Compare the two, should not be equal
                expect(f0).not.toEqual(f1);

                // Invoke done
                done();
            });
          });
        });
      }());
