# Ethyca Data Map

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app) and the
TypeScript template using the following command.

```bash
$ yarn create react-app my-app --template typescript
```

## Available Scripts

In the project directory, you can run:

```bash
$ yarn install
```

Installs all dependencies. This project mainly uses
["TailwindCSS"](https://tailwindcss.com/) for easier styling and layout and
["lodash"](https://lodash.com/) to help with some object manipulation.

In the same project directory, you can also run:

```bash
$ yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Time Spent

4 hours

## Assumptions & Trade-offs

- Assumed outside libraries were ok for speeding up some development
- Started developing basic Create, Read, Update, Delete (CRUD) features in the
  order of Read, Update, Delete, Create and was unable to get to Create in the 4
  hours
- Prioritized some of the other CRUD operations such as Delete and additional
  features like filtering as they seemed to be more interesting or challenging
  to me even though there are artifacts in the UI with Create in mind
- Architected the file IO as if it was the backend supporting a RESTful API
- Assumed it was ok to manipulate the shape of the input data as much as
  necessary to support the UI and features
- Assumed it was ok to not do any "real" deletes and utilize the browsers
  refresh button to reload to initial state

## Special Features & Highlights

### Architecture

The main component in the application is the `DataMap`, which is wrapped in a
context provider to manage the state of the application. The idea was to make
sure any children, no matter how nested, that needed access to the state could
make use of `useContext`. However, it ended up being a little unnecessary and
passing of simple props was sufficient for the features that were built.

In addition to the context, a reducer was used to handle state changes. This
made adding new features and ways to modify the state very easy and central to
one location. It also meant in a real application environment, keeping the UI
state and the backend state in sync would be a matter of following a simple
pattern of calling the API to communicate with the backend and then upon success
dispatching the appropriate action to ensure the UI state matched.

### Filtering

Filtering was done statically to support viewing only Applications and Services
to prove filtering could be achieved. However, it was built to be extensible to
add some dynamic filtering or more static filters by simply creating more
reducer actions.

### Deleting

Deleting was done with no confirmation needed or actual modification to the
input file. This was to cut down on complexity, but also to allow for the data
to be reset much more quickly while developing.
