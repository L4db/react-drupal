# ReactJS Frontend for Drupal

Install the drupal jsonapi module (https://www.drupal.org/project/jsonapi)

```
composer require drupal/jsonapi
```
Verify that the jsonapi module is working by requesting the list of articles

curl https://drupal.hardened.be/jsonapi/node/article
This should return a json response with the list of published articles.

 

Use create react app (cfr. https://github.com/facebook/create-react-app)
```
npx create-react-app drupal-react
cd drupal-react
npm install --save react-redux redux redux-bees redux-devtools-extension reactstrap react-dom bootstrap
```





