/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // Test Rss Feeds 
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */


        // Test allfeeds 
        it('Allfeeds', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */

        // if allfeeds has a URL defined and not empty
        it('Urls defined and not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */

        // if allFeeds has a name defined and not empty
        it('Name defined and not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });



    /* TODO: Write a new test suite named "The menu" */

    // test suite the menu
    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // for class 'menu-hidden' if true menu [hidden]

        it('Menu Element ', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        
            // on click event if the menu show or not
            it('working Toggle On Click ', function () {
                // Call class 'menu-icon-link' 
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
        

    /* TODO: Write a new test suite named "Initial Entries" */

    // Test suite named [initial entries]
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        // Call a function to do an asynchronous request 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* Tests if the loadFeed function 
        *  has at least a single '.entry' within the '.feed' container 
        */
        it('after loadFeed is called there is at least a single .entry element in the container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection" */

    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        var firstFeed, secondFeed;
        
        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */

        // loadFeed function
        beforeEach(function(done) {
            loadFeed(1, function() {

                // test first feed is loaded
                console.log('First Feed Loaded!');

                // Loads first entry and checks
                firstFeed = $('.feed').html();
                loadFeed(2, function() {

                    // Tests second feed is loaded
                    console.log('Second Feed Loaded!');
                    done();
                });
            });        
        });
        
        afterEach(function() {
            loadFeed(0);
        });

        // Tests to see if two entries are not equal
        it('checks if two feeds are different', function() {

            // Checks second feed
            secondFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(secondFeed);
        }); 
    });

}());