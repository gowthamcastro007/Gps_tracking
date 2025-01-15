import React from "react";


import { Navigate } from 'react-router-dom';

// Layout Types
import BaseLayout from "./BaseLayout";
// Route Views
import Dashboard from "./views/Dashboard/Dashboard";
import Buttons from "./views/Components/ButtonsContainer";
import Badge from "./views/Components/BadgeContainer";
import Card from "./views/Components/CardsContainer";
import Alert from "./views/Components/AlertContainer";
import ProgressBar from "./views/Components/ProgressBarContainer";
import Loader from "./views/Components/LoaderContainer";
import UIElements from "./views/UIElements/UIElements";
import Widgets from "./views/Widgets/WidgetsContainer";
import Forms from "./views/Forms/Forms";
import Tables from "./views/Tables/Tables";
import Pages from "./views/Pages/Pages";
import Charts from "./views/Charts/Charts";

var routes = [
  {
    path: "/noki-cargo",
    exact: true,
    layout: <BaseLayout/>,
    component: () => <Navigate to="/noki-cargo/dashboard" />,
  },
  {
    path: "/noki-cargo/dashboard",
    layout: <BaseLayout/>,
    component: <Dashboard/>,
  },

  {
    path: "/noki-cargo/components/buttons",
    layout: <BaseLayout/>,
    component: <Buttons/>,
  },

  {
    path: "/noki-cargo/components/badge",
    layout:<BaseLayout/>,
    component: <Badge/>,
  },

  {
    path: "/noki-cargo/components/card",
    layout:<BaseLayout/>,
    component: <Card/>,
  },
  {
    path: "/noki-cargo/components/alert",
    layout: <BaseLayout/>,
    component: <Alert/>,
  },
  {
    path: "/noki-cargo/components/progressbar",
    layout: <BaseLayout/>,
    component: <ProgressBar/>,
  },
  {
    path: "/noki-cargo/components/loader",
    layout: <BaseLayout/>,
    component: <Loader/>,
  },

  {
    path: "/noki-cargo/ui-elements",
    layout:<BaseLayout/>,
    component: <UIElements/>,
  },
  {
    path: "/noki-cargo/widgets",
    layout: <BaseLayout/>,
    component: <Widgets/>,
  },
  {
    path: "/noki-cargo/forms",
    layout: <BaseLayout/>,
    component: <Forms/>,
  },
  {
    path: "/noki-cargo/tables",
    layout: <BaseLayout/>,
    component: <Tables/>,
  },
  {
    path: "/noki-cargo/pages",
    layout: <BaseLayout/>,
    component: <Pages/>,
  },

//   {
//     path: "/noki-cargo/charts",
//     layout: <BaseLayout/>,
//     component: <Charts/>,
//   },
];

export default routes;