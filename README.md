
# Brain Food / Frontend Repository

## Abstract
Brain Food is a fullstack responsive web application that allows users to signup for an account, login, enter a mood level for the day on a sadness to happiness scale from 1-5, and time allotted to cook. Users can choose a color theme for the application dependent how they want to feel. When a mood level and time to cook input is entered, recipes will then populate based on nutritional value meant to either boost or maintain mood levels. Users have the option to favorite recipes and view details, such as cook time, nutritional content, ingredients needed to make the meal, and instructions on how to do so. A personal dashboard is available to view favorited recipes, delete recipes, view recipe details, search for recipes by name, view average mood level, and personally rate recipes on a star rating system. Brain Food was created using React Vite + TypeScript and tested with Cypress. Accessibility was assessed via Chrome DevTools Lighthouse and Chrome WAVE extension. Happy cooking! 

## Contributors
[Erin Kelley](https://github.com/kelleyej) [Jack Sweeney](https://github.com/JackCSweeney) [Faisal Nazari](https://github.com/mfaisalnazari) [Igor Magalhaes](https://github.com/IgorrMagalhaess) [Laura Long](https://github.com/lalonggone/)

## Technologies Used
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat) ![React Router Badge](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat) ![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat) ![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat) ![Cypress Badge](https://img.shields.io/badge/Cypress-69D3A7?logo=cypress&logoColor=fff&style=flat) ![Framer Badge](https://img.shields.io/badge/Framer-05F?logo=framer&logoColor=fff&style=flat) ![MUI Badge](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=fff&style=flat) ![CircleCI Badge](https://img.shields.io/badge/CircleCI-343434?logo=circleci&logoColor=fff&style=flat) ![Netlify Badge](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=fff&style=flat)

## App Preview

## Deployed Link 
[Brain Food](https://jade-lebkuchen-46144d.netlify.app/)

## Local Installation and Setup
1. Clone this repository to your local machine:
   ```sh
   git clone git@github.com:Moody-Foodies/moody-foodies-fe.git
   ```

2. Navigate to the project directory:
   ```sh
   cd moody-foodies-fe
   ```

3. Install the necessary dependencies:
   ```sh
   npm install
   ```

4. Start the application:
   ```sh
   npm run dev
   ```

5. Open the app at [http://127.0.0.1:5173/) in your browser.

## Context
- Goals
   - Build a fullstack application over a four-week period.
   - Successfully implement a stretch technology into the application. 
   - Collaborate on a team utilizing the SCRUM/Agile methodology, holding daily standups, sprints, frequent communication, and check-ins with our project manager.
   - Utilize CI/CD to ensure seamless integration, streamline workflow, and maintain clean, quality code.
     
- Wins
  - Setting up CirclCI with Netlifly for continuous integration/continous deployment.
  - Leaning and utilizing TypeScript through the codebase.
  - Working with backend developers to build a fullstack application!
  - Making the application responsive across all major breakpoints.
  - Developing a highly accessible application, verified with Chrome DevTools Lighthouse and Chrome WAVE extension.
     
- Challenges
  - Setting up the config.yml file for CI/CD implementation and troubleshooting pipeline errors. 
  - Navigating user error handling and proper user feedback with missing pieces of data, to ensure a strong and positive user experience. 

## Future Improvements 
- Create a save password feature for the login form and allow users to login in with Google or Facebook.
- Document the date and save user mood level for the day to more extensively be able to track mood level over time and view trends.
- Implement more recipes and allow users to choose recipes based on breakfast, lunch, or dinner suggestions.
- Allow users to add notes to recipes as they are made or chosen. 
