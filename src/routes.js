import React from 'react'

import GranteeListPage from './pages/grantee/grantee-list/grantee-list.page'
import GranteeAddPage from './pages/grantee/grantee-add/grantee-add.page';

const routes = {
  "/": () => <GranteeListPage />,
  "/grantees/add": () => <GranteeAddPage />
};
export default routes;