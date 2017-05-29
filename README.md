# Hex Colony

This is a simulator of hexagonal cells growing. Each colony has initial source-cell, color and speed of growing.  

Based on [Redux](https://github.com/reactjs/redux) and [React](https://github.com/facebook/react)
Also [D3 Chart](https://d3js.org/) and [Bootstrap](http://getbootstrap.com/) layout

Thanks to [@maxfarseer](https://habrahabr.ru/users/maxfarseer/) for awesome tutorial and https://roast.bobon.coffee/ for inspiration

## Local setup

- Install the dependencies with `npm install`
- Run once time build `npm run build`
- Run build with source file changing tracking `npm run dev`
- Launch `public/index.html`by browser

## Features:

- Temporary adding of new colonies performing by clicking on blank cell in map component. According this new colony is creating and adding to colonies list with automatically generated properties like Name, Color, Speed. The values of properties can be changed in MapContainer -> onCellClicked() -> this.props.actions.addColony() . In future new colonies will be creating by pop-up form component with manual setting al necessary properties.
- Colonies are growing only on neighbour cells in wide (filling newest cells) and deep (looking for old cells)
- Entries in Statistic component are sorting by population amount, the hugest color is down

## In progress now:

- Implementing function of removing colony by clicking to according button on Colonies List component
- Implementing of pop-up component for adding new colonies

## Next features:

- Add tabs to Colonies List component to make sorting by columns
- Add diagrams to visualize behaviour each coloniy
- Extend number of colony-growing strategies, like occupation, prevent occupation
- Include new colony properties such as cells lifecycle (in seconds), cell resistance, attack possibility (strength), several grown directions in one turn
- Include server side to containing simulation-process

gmail: monosolar.in@gmail.com ,
skype: c-mass