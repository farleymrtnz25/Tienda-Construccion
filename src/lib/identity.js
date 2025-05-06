import netlifyIdentity from 'netlify-identity-widget';

export function initIdentity() {
  netlifyIdentity.init();
  return netlifyIdentity;
}

export function getCurrentUser() {
  return netlifyIdentity.currentUser();
}