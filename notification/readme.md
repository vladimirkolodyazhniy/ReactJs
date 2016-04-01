# React Towel

Rapid React Prototyping

React Towel brings together react, react-dom, and throw-in-the-towel to make it dead simple to start using React with JSX.

1. Reference the script from a cdn
2. Start writing code (including JSX) in `<script type="text/babel"></script>` tags
3. Or in external files: `<script type="text/babel" src="./external.js"></script>`
3. View the page
5. Profit?

```es6
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://npmcdn.com/react-towel@2/umd/react-towel.js" charset="utf-8"></script>
    <script type="text/babel">
      const Winner = () => <h1>winning?</h1>
      ReactDOM.render(
        <Winner />,
        document.getElementById('root')
      )
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
