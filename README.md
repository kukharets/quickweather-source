Hello! This is a non-profit, open-source website created by the author alone at the end of 2019 to demonstrate the code and hone personal skills.

A simple idea of basic functionality is a resource that allows you to quickly get and repost the current weather anywhere in the world from any device in a few clicks.

During the development, an advanced stack of front-end technologies was used, as well as a bias towards the concept of mobile-first development.

**June 2020 update:**

Without changing the essence of the site, I decided to consider and implement a modular system with truly independent modules here, and not just divide the project into folders with the most obvious structural units.

What I mean? First of all, it is redux-saga as a kernel in where you can move logic from JSX components, realizing in practice the separation of business logic from display.

Secondly - what are real independent modules? In most projects, we see modules that are interconnected by the logic prescribed in the components, while these connections are most often quite mixed up with each other. Yes, we have a folder “modules” and we see a module there, but if you try to reuse this module in another project, you will be disappointed, because most of the logic will remain in the components, or other modules, and you will have to search for missed logic parts and copy it manually. Not modular modularity, agree?

I tried to solve these issues in the current update, the essence of the solutions that seemed effective to me can be briefly studied in the "state/ducks" folder

You can see subfolders:<br>
googleApi <br>
places <br>
searchBox <br>
weather<br>

Each of these modules is completely independent. You can easily copy it into your project, and it will retain its functionality to the fullest.

And what is interesting, to link them into the logic of one project, it can be use just one file - ducksConnectorSaga.js from the same folder.

Working after changing the architecture on minor changes, I was able to appreciate the advantages of this approach - the lack of hard links allows you to quickly and easily modify the part of the project that you need, knowing that along with this a completely different part of the project will not break, even without tests.

However, the TypeScript and tests are the next update that I will work on in my free time.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


