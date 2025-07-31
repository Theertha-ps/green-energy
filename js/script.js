// Load your images on page-load
function preloader() {
    const imagesList = [
       "https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
       "https://images.unsplash.com/photo-1467733238130-bb6846885316?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGVuZXJneSUyMHNlcnZpY2VzfGVufDB8fDB8fHwy",
       "https://images.unsplash.com/photo-1586366461834-d2d65d725a2e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    const images = [];
    for (let i = 0; i < imagesList.length; i++) {
        images[i] = new Image();
        images[i].src = imagesList[i];
    }

    // Images ready to be used:
    console.log(`Preloaded images:\n\t${images[0].src}\n\t${images[1].src}\n\t${images[2].src}`);
};    
window.addEventListener("load", preloader);


/* 
Get all buttons in a NODE LIST of buttons (array like structure) */
const buttons = document.querySelectorAll('.btn-container a');

/* 
Complete your resource-object that will store the dynamic content.
Resource object should 3 sub-objects. Give your sub-objects
meaningful names. Every sub-object should have the following
properties headingContent, bodyText, imgUrl and imgAlt. */

const resourceObject = {
    researchFunding: {
        headingContent: "Enable Green Research & Funding",
        bodyText: "By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology.",
        imgUrl: "https://images.unsplash.com/photo-1454779132693-e5cd0a216ed3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imgAlt: "solar-panels-on-the-roof-top"
    },
    expandUpgrade: {
        headingContent: "Expand and Upgrade Energy Services.",
        bodyText: "By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States and landlocked developing countries, in accordance with their respective programmes of support.",
        imgUrl: "https://images.unsplash.com/photo-1467733238130-bb6846885316?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGVuZXJneSUyMHNlcnZpY2VzfGVufDB8fDB8fHwy",
        imgAlt: "messy-wired-socket"
    },
    modernEnergy: {
        headingContent: "Universal Access to Modern Energy",
        bodyText: "Local wind energy cooperatives allow residents to collectively invest in and benefit from wind power projects. By pooling resources, communities can access clean wind energy at competitive rates while creating local jobs and economic benefits. These cooperatives make renewable energy ownership possible for families who couldn't afford individual installations, democratizing access to clean power.",
        imgUrl: "https://images.unsplash.com/photo-1586366461834-d2d65d725a2e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imgAlt: "solar-panels-on-the-ground"
    }
};

/* 
Get the reference to your HTML-container
that will be dynamically loaded from the resource-object. */
const contentContainer = document.querySelector('.body-container');

/* 
The first button in a NODE LIST of buttons will initially 
have the id: active-button - this will uniquely style 
the active button (CSS rule). 

The first content from the
resource-object will be loaded on the page load:
`<h1>${headingContent}</h1>
 <img src="${imgUrl}" alt="${imgAlt}">
 <p>${bodyText}</p>` */
window.addEventListener('load', function() {
    const firstContent = resourceObject.researchFunding;
    contentContainer.innerHTML = `
        <h1>${firstContent.headingContent}</h1>
        <img src="${firstContent.imgUrl}" class="body-img" alt="${firstContent.imgAlt}">
        <p>${firstContent.bodyText}</p>
    `;
});

/* 
Start your handleSelection function here. */ 
function handleSelection(event) {
    event.preventDefault();
    
    /* 
    Remove the id active-button from the element that
    contains it prior to the click-event. 

    This will require the loop throught the NODE LIST of buttons. 
    Inside the loop, use conditional and the element object method
    hasAttribute() to check if the current button in the loop containes the id.
    If it does, use element-object property removeAttribute()
    to remove the id. */
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].hasAttribute('id') && buttons[i].id === 'active-button') {
            buttons[i].removeAttribute('id');
        }
    }

    /*
    Use the element-object method setAttribute() to set the id active-button 
    to the currently clicked button. */
    event.target.closest('a').setAttribute('id', 'active-button');

    /* 
    Use conditional and event-object to check which button is clicked
    and based on that, create HTML with the data inside the backticks:
    `<h1>${headingContent}</h1>
     <img src="${imgUrl}" alt="${imgAlt}">
     <p>${bodyText}</p>`
    Assign this content to to your HTML-container that will 
    be dynamically loaded (you already got the reference to 
    this container before you started the function handleSelection) */ 

    const clickedButton = event.target.closest('a');
    let selectedContent;
    
    if (clickedButton === buttons[0]) {
        selectedContent = resourceObject.researchFunding;
    } else if (clickedButton === buttons[1]) {
        selectedContent = resourceObject.expandUpgrade;
    } else if (clickedButton === buttons[2]) {
        selectedContent = resourceObject.modernEnergy;
    }
    
    contentContainer.innerHTML = `
        <h1>${selectedContent.headingContent}</h1>
        <img src="${selectedContent.imgUrl}" class="body-img" alt="${selectedContent.imgAlt}">
        <p>${selectedContent.bodyText}</p>
    `;
}



/* 
Register all buttons to click event. The event-handler handleSelection will listen 
for this event to happen. */
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleSelection);
}
