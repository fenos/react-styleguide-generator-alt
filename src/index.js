import React from 'react';
import page from 'page';
import App from './components/App';

let mountNode = document.getElementById('app');

/**
 * Home
 */
page('.', () => {
  let props = {
    query: 'overview',
    keys: ['category'],
    exact: true
  };

  React.render(<App {...props} />, mountNode);
});

/**
 * Search Result
 */
page('/search/:query', (ctx) => {
  let query = ctx.params.query;

  let props = {
    query: query,
    keys: ['category', 'title', 'description'],
    searchQuery: query
  };

  React.render(<App {...props} />, mountNode);
});

/**
 * Category and Detail
 */
page('/:category/:title?', (ctx) => {
  let category = ctx.params.category;
  let title = ctx.params.title;

  if (category === 'overview') {
    page.redirect('/');
    return;
  }

  let props = {
    query: title ? title : category,
    keys: title ? ['title'] : ['category'],
    exact: true,
    selectedCategory: category
  };

  React.render(<App {...props} />, mountNode);
});

/**
 * Not Found
 */
page('*', () => {
  page.redirect('.');
});

page.base(window.options.base);
page.start({ hashbang: window.options.hashbang });
