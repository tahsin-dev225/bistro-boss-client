import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

import Main from './Layout/Main';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import Order from './Pages/Order/Order/Order';
import Login from './Pages/Login/Login';
import AuthProvider from './Provider/AuthProvider';
import SignUp from './Pages/Login/SignUp';
import Secret from './Pages/Secret/Secret';
import PrivateRoutes from './Provider/PrivateRoutes';
import Dashboard from './Layout/Dashboard';
import Cart from './Pages/Dashboard/Cart/Cart';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import AddItems from './Pages/Dashboard/AddItems/AddItems';
import AdminRoute from './Provider/AdminRoute';
import ManageItems from './Pages/Dashboard/ManageItems/ManageItems';
import UpdateItem from './Pages/Dashboard/UpdateItem/UpdateItem';
import Payment from './Pages/Dashboard/Payment/Payment';
import PaymentHistory from './Pages/Dashboard/Payment/PaymentHistory/PaymentHistory';
import UserHome from './Pages/Dashboard/UserHome/UserHome';
import AdminHome from './Pages/Dashboard/AdminHome/AdminHome';


const router = createBrowserRouter([
  { 
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'menu',
        element:<Menu></Menu>
      },
      {
        path:'/order/:category',
        element:<Order></Order>,
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/signUp',
        element:<SignUp></SignUp>
      },
      {
        path:'secret',
        element:<PrivateRoutes><Secret></Secret></PrivateRoutes>
      }
    ]
  },
  {
    path:"dashboard",
    element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children:[
      // normal user routes
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'cart',
        element:<Cart></Cart>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },

      // Admin Routes
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path:'manageItems',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute> 
      },
      {
        path:'updateItem/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`https://bistro-boss-server-kappa-ivory.vercel.app/menu/${params.id}`)
      },
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
    ]
  }
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="scroll-smooth">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
