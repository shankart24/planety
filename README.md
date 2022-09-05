## Planety - Built with React

#### Test the app locally:

1. `json-server --watch db.json` 
2. `npm start`

#### Test the Deployment:

(Since it's a private repo, this works only with github logged in browser...should be the same for collaborators)

1. `json-server --watch db.json` 
2. Go to `https://planety-shankart24.vercel.app/` 

#### Base URL: 

json-server defaults to port 3000. If the port is changed then the base URL needs to be changed as well

Go to `src -> config -> modify the URL`

------------------------------------------------

### Folder Structure

**Components**  -  Contains reusable components (Card, Checkbox) along with a sections folder that has the main UI blocks (Navbar, Search etc)

**Config**  -  Has a base URL for the API

**Functions**  -  Currently has a single function to make api calls and return a boolean to check for errors

**Store**  -   Has the main store along with two slices: `dataSlice` for keeping track of the main data & `filterSlice` to handle the search & other filters


