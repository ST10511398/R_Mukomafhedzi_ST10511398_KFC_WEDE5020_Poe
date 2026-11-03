
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. SHARED FEATURES FOR ALL PAGES
    // ==========================================

    // Highlight the current navigation link
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks =
        document.querySelectorAll(".navigation a");

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });


    // Automatically update copyright year
    const copyrightYear =
        document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


    // Back to Top button
    const backToTop = document.createElement("button");

    backToTop.textContent = "↑ Back to Top";
    backToTop.className = "back-to-top";
    backToTop.type = "button";
    backToTop.hidden = true;

    document.body.appendChild(backToTop);

    function updateBackToTop() {
        backToTop.hidden = window.scrollY < 300;
    }

    window.addEventListener("scroll", updateBackToTop);
    updateBackToTop();

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // ==========================================
    // 2. SHARED IMAGE LIGHTBOX
    // ==========================================

    // Works with images on Home, About,
    // Services and Products pages.

    const galleryImages = document.querySelectorAll(
        ".hero-image img, " +
        ".summary-image img, " +
        ".history-image img, " +
        ".team-member img, " +
        ".service img, " +
        ".product img"
    );

    if (galleryImages.length > 0) {

        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.hidden = true;

        const largeImage = document.createElement("img");
        largeImage.alt = "";

        const closeImage = document.createElement("button");
        closeImage.textContent = "Close Image";
        closeImage.type = "button";

        lightbox.appendChild(closeImage);
        lightbox.appendChild(largeImage);

        document.body.appendChild(lightbox);

        let previousFocus = null;

        function closeLightbox() {
            lightbox.hidden = true;
            largeImage.removeAttribute("src");

            if (previousFocus) {
                previousFocus.focus();
            }
        }

        galleryImages.forEach(function (image) {

            image.classList.add("gallery-image");
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute(
                "aria-label",
                "Enlarge " + image.alt
            );

            function openImage() {
                previousFocus = document.activeElement;
                largeImage.src = image.src;
                largeImage.alt = image.alt;
                lightbox.hidden = false;
                closeImage.focus();
            }

            image.addEventListener("click", openImage);

            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" ||
                    event.key === " ") {

                    event.preventDefault();
                    openImage();
                }
            });
        });

        closeImage.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !lightbox.hidden) {
                closeLightbox();
            }
        });
    }


    // ==========================================
    // 3. REUSABLE VALIDATION
    // ==========================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
        /^(?:\+27|0)[6-8][0-9]{8}$/;

    function validEmail(email) {
        return emailPattern.test(email);
    }

    function validPhone(phone) {
        return phonePattern.test(phone.replace(/\s/g, ""));
    }

    function showResponse(element, message, success) {
        if (!element) {
            return;
        }

        element.textContent = message;
        element.className = success
            ? "form-success"
            : "form-error";
    }

    function clearResponse(element) {
        if (element) {
            element.textContent = "";
            element.className = "";
        }
    }


    // ==========================================
    // 4. HOME PAGE
    // ==========================================

    // Time-based welcome message
    const welcomeMessage =
        document.getElementById("welcomeMessage");

    if (welcomeMessage) {

        const hour = new Date().getHours();

        if (hour < 12) {
            welcomeMessage.textContent =
                "Good Morning! Welcome to KFC.";
        } else if (hour < 18) {
            welcomeMessage.textContent =
                "Good Afternoon! Welcome to KFC.";
        } else {
            welcomeMessage.textContent =
                "Good Evening! Welcome to KFC.";
        }
    }


    // Home Read More button
    const homeReadMoreBtn =
        document.getElementById("homeReadMoreBtn");

    const moreAbout =
        document.getElementById("moreAbout");

    if (homeReadMoreBtn && moreAbout) {

        homeReadMoreBtn.addEventListener("click", function () {

            moreAbout.hidden = !moreAbout.hidden;

            homeReadMoreBtn.textContent =
                moreAbout.hidden ? "Read More" : "Read Less";

            homeReadMoreBtn.setAttribute(
                "aria-expanded",
                String(!moreAbout.hidden)
            );
        });
    }


    // Home newsletter form
    const newsletterForm =
        document.getElementById("newsletterForm");

    if (newsletterForm) {

        const response =
            document.getElementById("newsletterResponse");

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("subscriberName").value.trim();

            const email =
                document.getElementById("subscriberEmail").value.trim();

            const consent =
                document.getElementById("newsletterConsent").checked;

            if (name.length < 2) {
                showResponse(response,
                    "Please enter a valid full name.", false);
                return;
            }

            if (!validEmail(email)) {
                showResponse(response,
                    "Please enter a valid email address.", false);
                return;
            }

            if (!consent) {
                showResponse(response,
                    "Please agree to receive promotional emails.", false);
                return;
            }

            if (!newsletterForm.reportValidity()) {
                return;
            }

            newsletterForm.reset();

            showResponse(response,
                "Thank you, " + name +
                "! Your details are valid. " +
                "This is a demonstration; no subscription was saved.",
                true);
        });

        newsletterForm.addEventListener("reset", function () {
            clearResponse(response);
        });
    }


    // ==========================================
    // 5. ABOUT US PAGE
    // ==========================================

    // History Read More
    const readMoreBtn =
        document.getElementById("readMoreBtn");

    const moreHistory =
        document.getElementById("moreHistory");

    if (readMoreBtn && moreHistory) {

        readMoreBtn.addEventListener("click", function () {

            moreHistory.hidden = !moreHistory.hidden;

            readMoreBtn.textContent =
                moreHistory.hidden ? "Read More" : "Read Less";

            readMoreBtn.setAttribute(
                "aria-expanded",
                String(!moreHistory.hidden)
            );
        });
    }


    // Team responsibilities
    const teamButtons =
        document.querySelectorAll(".team-btn");

    teamButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const description =
                button.parentElement.querySelector(
                    ".team-description"
                );

            if (description) {

                description.hidden = !description.hidden;

                button.textContent = description.hidden
                    ? "View Responsibilities"
                    : "Hide Responsibilities";

                button.setAttribute(
                    "aria-expanded",
                    String(!description.hidden)
                );
            }
        });
    });


    // About Us feedback form
    const feedbackForm =
        document.getElementById("feedbackForm");

    if (feedbackForm) {

        const response =
            document.getElementById("feedbackResponse");

        feedbackForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("feedbackName").value.trim();

            const email =
                document.getElementById("feedbackEmail").value.trim();

            const type =
                document.getElementById("feedbackType").value;

            const message =
                document.getElementById("feedbackMessage").value.trim();

            if (name.length < 2) {
                showResponse(response,
                    "Please enter a valid name.", false);
                return;
            }

            if (!validEmail(email)) {
                showResponse(response,
                    "Please enter a valid email.", false);
                return;
            }

            if (type === "") {
                showResponse(response,
                    "Please select a feedback type.", false);
                return;
            }

            if (message.length < 10) {
                showResponse(response,
                    "Your message must contain at least 10 characters.",
                    false);
                return;
            }

            if (!feedbackForm.reportValidity()) {
                return;
            }

            feedbackForm.reset();

            showResponse(response,
                "Thank you, " + name +
                "! Your feedback is valid. " +
                "This is a demonstration; it has not been sent.",
                true);
        });

        feedbackForm.addEventListener("reset", function () {
            clearResponse(response);
        });
    }


    // ==========================================
    // 6. SERVICES PAGE
    // ==========================================

    // Search and filter services
    const serviceSearch =
        document.getElementById("serviceSearch");

    const serviceFilter =
        document.getElementById("serviceFilter");

    const serviceResult =
        document.getElementById("serviceResult");

    const services =
        document.querySelectorAll(".services-container .service");

    if (serviceSearch && serviceFilter && services.length > 0) {

        function updateServices() {

            const searchText =
                serviceSearch.value.toLowerCase().trim();

            const category = serviceFilter.value;

            let count = 0;

            services.forEach(function (service) {

                const serviceText =
                    service.textContent.toLowerCase();

                const matchesSearch =
                    serviceText.includes(searchText);

                const matchesCategory =
                    category === "all" ||
                    service.dataset.category === category;

                service.hidden =
                    !(matchesSearch && matchesCategory);

                if (!service.hidden) {
                    count++;
                }
            });

            if (serviceResult) {
                serviceResult.textContent =
                    count + " service(s) found.";
            }
        }

        serviceSearch.addEventListener("input", updateServices);
        serviceFilter.addEventListener("change", updateServices);

        updateServices();
    }


    // Service View More buttons
    const serviceButtons =
        document.querySelectorAll(".service-btn");

    serviceButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const extra =
                button.parentElement.querySelector(".service-extra");

            if (extra) {

                extra.hidden = !extra.hidden;

                button.textContent =
                    extra.hidden ? "View More" : "View Less";

                button.setAttribute(
                    "aria-expanded",
                    String(!extra.hidden)
                );
            }
        });
    });


    // Service enquiry form
    const serviceEnquiryForm =
        document.getElementById("serviceEnquiryForm");

    if (serviceEnquiryForm) {

        const response =
            document.getElementById("serviceEnquiryResponse");

        serviceEnquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("serviceName").value.trim();

            const email =
                document.getElementById("serviceEmail").value.trim();

            const service =
                document.getElementById("selectedService");

            const message =
                document.getElementById("serviceMessage").value.trim();

            if (name.length < 2) {
                showResponse(response,
                    "Please enter a valid name.", false);
                return;
            }

            if (!validEmail(email)) {
                showResponse(response,
                    "Please enter a valid email address.", false);
                return;
            }

            if (service.value === "") {
                showResponse(response,
                    "Please select a service.", false);
                return;
            }

            if (message.length < 10) {
                showResponse(response,
                    "Your enquiry must contain at least 10 characters.",
                    false);
                return;
            }

            if (!serviceEnquiryForm.reportValidity()) {
                return;
            }

            let answer = "";

            if (service.value === "dine-in") {
                answer =
                    "Dine-in is available at participating restaurants.";
            } else if (service.value === "takeaway") {
                answer =
                    "Takeaway allows customers to collect their meals.";
            } else if (service.value === "delivery") {
                answer =
                    "Delivery depends on your location and restaurant.";
            } else if (service.value === "online") {
                answer =
                    "Online orders can be placed through supported channels.";
            } else if (service.value === "group") {
                answer =
                    "Larger meal combinations may suit families and groups.";
            } else if (service.value === "support") {
                answer =
                    "Visit our Contact Us page for customer assistance.";
            }

            showResponse(response,
                "Hello " + name + "! " + answer +
                " This is a demonstration; your enquiry was not sent.",
                true);
        });

        serviceEnquiryForm.addEventListener("reset", function () {
            clearResponse(response);
        });
    }


    // ==========================================
    // 7. PRODUCTS / MENU PAGE
    // ==========================================

    const menuSearch =
        document.getElementById("menuSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const priceSort =
        document.getElementById("priceSort");

    const productContainer =
        document.getElementById("productContainer");

    const menuResult =
        document.getElementById("menuResult");

    if (menuSearch && categoryFilter &&
        priceSort && productContainer) {

        const products = Array.from(
            productContainer.querySelectorAll(".product")
        );

        function updateMenu() {

            const searchText =
                menuSearch.value.toLowerCase().trim();

            const category = categoryFilter.value;
            const sortOption = priceSort.value;

            let count = 0;

            products.forEach(function (product) {

                const matchesSearch =
                    product.textContent.toLowerCase()
                        .includes(searchText);

                const matchesCategory =
                    category === "all" ||
                    product.dataset.category === category;

                product.hidden =
                    !(matchesSearch && matchesCategory);

                if (!product.hidden) {
                    count++;
                }
            });

            const sortedProducts = [...products];

            if (sortOption === "low") {

                sortedProducts.sort(function (a, b) {
                    return Number(a.dataset.price) -
                        Number(b.dataset.price);
                });

            } else if (sortOption === "high") {

                sortedProducts.sort(function (a, b) {
                    return Number(b.dataset.price) -
                        Number(a.dataset.price);
                });
            }

            sortedProducts.forEach(function (product) {
                productContainer.appendChild(product);
            });

            if (menuResult) {
                menuResult.textContent =
                    count + " menu item(s) found.";
            }
        }

        menuSearch.addEventListener("input", updateMenu);
        categoryFilter.addEventListener("change", updateMenu);
        priceSort.addEventListener("change", updateMenu);

        updateMenu();
    }


    // Meal price calculator
    const priceCalculatorForm =
        document.getElementById("priceCalculatorForm");

    if (priceCalculatorForm) {

        const response =
            document.getElementById("calculatorResult");

        priceCalculatorForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const product =
                document.getElementById("calculatorProduct");

            const quantity =
                Number(document.getElementById("calculatorQuantity").value);

            if (product.value === "") {
                showResponse(response,
                    "Please select a product.", false);
                return;
            }

            if (!Number.isInteger(quantity) ||
                quantity < 1 || quantity > 20) {

                showResponse(response,
                    "Quantity must be between 1 and 20.", false);
                return;
            }

            if (!priceCalculatorForm.reportValidity()) {
                return;
            }

            const total = Number(product.value) * quantity;

            const productName =
                product.options[product.selectedIndex].text;

            showResponse(response,
                productName + " x " + quantity +
                " = R" + total.toFixed(2) +
                " (estimated project price).",
                true);
        });

        priceCalculatorForm.addEventListener("reset", function () {
            clearResponse(response);
        });
    }


    // ==========================================
    // 8. PRODUCT ENQUIRIES PAGE
    // ==========================================

    const productSelect =
        document.getElementById("product");

    const productInfo =
        document.getElementById("productInfo");

    const productDescriptions = {
        "fried-chicken":
            "Fried chicken prepared with herbs and spices.",
        "zinger-burger":
            "A spicy burger with a crispy chicken fillet.",
        "twister":
            "A wrap containing chicken and other fillings.",
        "chicken-bucket":
            "A bucket containing multiple chicken pieces.",
        "family-meal":
            "A meal option designed for sharing.",
        "chips":
            "A serving of potato chips.",
        "soft-drink":
            "A refreshing beverage."
    };

    if (productSelect && productInfo) {

        productSelect.addEventListener("change", function () {

            productInfo.textContent =
                productDescriptions[productSelect.value] || "";
        });
    }


    // Product enquiry validation
    const enquiryForm =
        document.getElementById("enquiryForm");

    if (enquiryForm) {

        const response =
            document.getElementById("enquiryResponse");

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("enquiryName").value.trim();

            const email =
                document.getElementById("enquiryEmail").value.trim();

            const phone =
                document.getElementById("enquiryPhone").value.trim();

            const product =
                document.getElementById("product");

            const quantity =
                Number(document.getElementById("quantity").value);

            const enquiryType =
                document.getElementById("enquiry-type").value;

            const orderType =
                document.querySelector(
                    'input[name="order-type"]:checked'
                );

            const message =
                document.getElementById("enquiryMessage").value.trim();

            if (name.length < 2) {
                showResponse(response,
                    "Please enter a valid full name.", false);
                return;
            }

            if (!validEmail(email)) {
                showResponse(response,
                    "Please enter a valid email address.", false);
                return;
            }

            if (!validPhone(phone)) {
                showResponse(response,
                    "Please enter a valid South African cellphone number.",
                    false);
                return;
            }

            if (product.value === "") {
                showResponse(response,
                    "Please select a product.", false);
                return;
            }

            if (!Number.isInteger(quantity) ||
                quantity < 1 || quantity > 20) {

                showResponse(response,
                    "Quantity must be between 1 and 20.", false);
                return;
            }

            if (enquiryType === "") {
                showResponse(response,
                    "Please select an enquiry type.", false);
                return;
            }

            if (!orderType) {
                showResponse(response,
                    "Please select Dine-In, Takeaway or Delivery.",
                    false);
                return;
            }

            if (message.length < 10) {
                showResponse(response,
                    "Your message must contain at least 10 characters.",
                    false);
                return;
            }

            if (!enquiryForm.reportValidity()) {
                return;
            }

            const productName =
                product.options[product.selectedIndex].text.trim();

            let answer = "";

            if (enquiryType === "price") {

                answer =
                    "For the current price of " + productName +
                    ", please check the official KFC menu.";

            } else if (enquiryType === "availability") {

                answer =
                    "Availability of " + productName +
                    " may vary by restaurant.";

            } else if (enquiryType === "ingredients") {

                answer =
                    "Please contact KFC customer care for detailed " +
                    "ingredient and allergen information.";

            } else if (enquiryType === "order") {

                answer =
                    "You selected " + quantity + " " + productName +
                    " item(s) for " +
                    orderType.value.replace("-", " ") +
                    ". Use an official KFC ordering channel.";

            } else {

                answer =
                    "Please contact customer care for more information " +
                    "about " + productName + ".";
            }

            showResponse(response,
                "Hello " + name + "! " + answer +
                " This is a demonstration; your enquiry was not sent.",
                true);
        });

        enquiryForm.addEventListener("reset", function () {

            clearResponse(response);

            if (productInfo) {
                productInfo.textContent = "";
            }
        });
    }


    // ==========================================
    // 9. CONTACT US PAGE
    // ==========================================

    // Search locations
    const locationSearch =
        document.getElementById("locationSearch");

    const locations =
        document.querySelectorAll(".location");

    const locationResult =
        document.getElementById("locationResult");

    if (locationSearch && locations.length > 0) {

        function updateLocations() {

            const searchText =
                locationSearch.value.toLowerCase().trim();

            let count = 0;

            locations.forEach(function (location) {

                const locationName =
                    location.textContent.toLowerCase();

                location.hidden =
                    !locationName.includes(searchText);

                if (!location.hidden) {
                    count++;
                }
            });

            if (locationResult) {
                locationResult.textContent =
                    count === 0
                        ? "No matching locations found."
                        : count + " location(s) found.";
            }
        }

        locationSearch.addEventListener("input", updateLocations);
    }


    // Contact form validation and email preparation
    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        const response =
            document.getElementById("contactResponse");

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const phone =
                document.getElementById("contactPhone").value.trim();

            const subject =
                document.getElementById("contactSubject").value.trim();

            const reason =
                document.getElementById("contactReason").value;

            const message =
                document.getElementById("contactMessage").value.trim();

            if (name.length < 2) {
                showResponse(response,
                    "Please enter a valid full name.", false);
                return;
            }

            if (!validEmail(email)) {
                showResponse(response,
                    "Please enter a valid email address.", false);
                return;
            }

            if (phone !== "" && !validPhone(phone)) {
                showResponse(response,
                    "Please enter a valid South African cellphone number.",
                    false);
                return;
            }

            if (subject.length < 3) {
                showResponse(response,
                    "Subject must contain at least 3 characters.",
                    false);
                return;
            }

            if (reason === "") {
                showResponse(response,
                    "Please select a reason for contact.", false);
                return;
            }

            if (message.length < 10) {
                showResponse(response,
                    "Your message must contain at least 10 characters.",
                    false);
                return;
            }

            if (!contactForm.reportValidity()) {
                return;
            }

            const emailSubject =
                "KFC Contact: " + subject;

            const emailBody =
                "Customer Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + (phone || "Not provided") + "\n" +
                "Reason: " + reason + "\n\n" +
                "Message:\n" + message;

            const emailLink =
                "mailto:kfccustomercare@dsg.co.za" +
                "?subject=" + encodeURIComponent(emailSubject) +
                "&body=" + encodeURIComponent(emailBody);

            showResponse(response,
                "Your details are valid. Your email application " +
                "should open. Review the message and click Send.",
                true);

            // Opens the visitor's configured email application
            window.location.href = emailLink;
        });

        contactForm.addEventListener("reset", function () {
            clearResponse(response);
        });
    }

}); // END OF DOMContentLoaded

