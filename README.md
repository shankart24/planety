## Planety - Built with React

# To test the app locally

Run commands: 

1. `json-server --watch db.json` 
2. `npm start`

# Folder Structure

**Components** - Contains reusable components (Card, Checkbox) along with a sections folder that has the main UI blocks (Navbar, Search etc)

**Config** - Has a base URL for the API

**Functions** - Currently has a single function to make api calls and return a boolean to check for errors

**Store** - Has the main store along with a features folder that has two slices: dataSlice for keeping track of the main data & filterSlice to handle the search & other filters


