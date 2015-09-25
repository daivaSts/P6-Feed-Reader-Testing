/* feedreader.js
 * The spec file that Jasmine will read. Contains all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function, since some of these tests may require DOM elements
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    "use strict";

    /* A test suite is about the RSS feeds definitions, the allFeeds variable in the application.
    */
    describe("RSS Feeds:", function () {
        var len = allFeeds.length;

        /* It tests to make sure that the allFeeds variable has been defined and that it is
         * not empty project.
         */
        it("Are defined.", function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed in the allFeeds object and ensures it
         * has a URL defined and that the URL is not empty.
         */
        it("Each feed has URL.", function () {
            for (var i = 0; i < len; i ++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("Each feed has name.", function () {
            for (var j = 0; j < len; j ++) {
                expect(allFeeds[j].name).toBeDefined();
                expect(allFeeds[j].name.length).not.toBe(0);
            }
        });
    });

    /* A test suite about the RSS Feeds menu */
    describe("The menu:", function () {

        var menu = document.getElementsByClassName("menu-hidden");

        /* A test that ensures the menu element is hidden by default.
         */
        it("Menu element is hidden by default.", function () {
            expect($("body").hasClass("menu-hidden")).toBe(true);
            expect(menu[0].hidden).toBe(false);
        });

        /* A test that ensures the menu changes visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when clicked and does it hide when clicked again.
         */
        it("Menu element changes visibility on click.", function () {
            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            expect(menu[0]).toBeUndefined();

            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect(menu[0].hidden).toBe(false);
        });
    });

    /* A test suite about the individual initial feed entries */
    describe("Initial Entries:", function () {

        /* A test that ensures when the loadFeed function is called and completes its work, there
         * is at least a single .entry element within the .feed container. loadFeed() is asynchronous
         * so this test require the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var elmChild, elmClass1, elmClass2;

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it("There is at least one element within the .feed container.", function (done) {
            expect($(".feed a").length).not.toBe(0);
            done();
        });

        it("The .feed container has children.", function (done) {
            //expect($(".feed").children()[0]).not.toBeNull();
            expect($(".feed").children()[0]).not.toBeUndefined();
            done();
        });

        it("The 'article' element has class 'entry'.", function (done) {
            elmClass2 = $("article").hasClass("entry");
            expect(elmClass2).toBe(true);
            done();
        });

        it("There is 'a' tag element within the .feed container.", function (done) {
            elmChild = $(".feed").children("a");
            //expect(elmChild).not.toBeNull();
            expect(elmChild).not.toBeUndefined();
            done();
        });

        it("The 'a' tag element has class 'entry-link'.", function (done) {
            elmClass1 = $("a").hasClass("entry-link");
            expect(elmClass1).toBe(true);
            done();
        });

        it("The 'a' element contains 'p' element.", function (done) {
            expect($("a p")[0]).not.toBeUndefined();
            done();
        });

    });

    /* A test suite about new loaded entries */
    describe("New Feed Selection:", function () {
        /* A test that ensures when a new feed is loaded by the loadFeed function that the content
         * actually changes. loadFeed() is asynchronous.
         */
        var titles1, titles2, href1, href2, p1, p2;

        beforeEach(function (done) {
            loadFeed(0, function () {
                titles1 = $(".feed h2").text();
                href1 = $(".feed a").attr("href");
                p1 = $(".feed p").text();
                done();
            });
        });

        it("The url is changing in .feed container 'a' tag with new load.", function (done) {
            loadFeed(1, function () {
                href2 = $(".feed a").attr("href");
                expect(href1).not.toBe(href2);
                done();
            });
        });

        it("The title is changing in .feed container 'h2' and 'p' tags with new load.", function (done) {
            loadFeed(1, function () {
                titles2 = $(".feed h2").text();
                p2 = $(".feed p").text();
                expect(titles1).not.toBe(titles2);
                expect(p1).not.toBe(p2);
                done();
            });
        });
    });
}());
