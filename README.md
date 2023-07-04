# TechExercise-Cart
 A simple shopping cart made with vanilla JS


# General Notes
- There are two versions of the program available: a static web page and a command-line program. 
- The test folder contains the program along with its test module.
- The web application was created to provide additional proof of knowledge. Visit this as well!
- The program was developed without using any framework, except for Bootstrap 5 for the webpage UI and Jest for unit testing.
- All project requirements have been fulfilled. Please proceed with testing different scenarios of product/item combinations in the shopping cart.

# Running the Web application
- The web app has been deployed on Github Pages and can be viewed at the link below:
https://mimura-arieljr.github.io/TechExercise-Cart/
- Alternatively, you can download the provided GitHub Pages artifact, which contains all the necessary code resources. You can then open the HTML file directly from there.

# Running the Command-line program
- The program runs using Node.js, so please ensure that you have it installed. You can download it from this link: 
https://nodejs.org/en
- Open a terminal and navigate to the directory where the amaysimCart.js file is located.
- Run the following command in the terminal:
    'node amaysimCart.js'
- The program will display further instructions on how to use it.
- Product names are case sensitive. Enter them as appearing on "Products" array.

# Running the test script
- Please make sure that you have Node.js installed as the program requires it to run. You can download Node.js from this link: https://nodejs.org/en.
- Open a terminal and navigate to the directory where the shoppingCart.js module is located. It should be inside the "test" folder.
** The shoppingCart.js module is a modified version of amaysimCart.js that only includes the shoppingCart class. The handleInput() and startProgram() methods were removed to enable Jest testing. **
- Once you are in the correct directory, execute the command "npm install jest --save-dev". This command will update or create the package.json file and install any necessary dependencies.
- Run "npx jest" to execute the test module.