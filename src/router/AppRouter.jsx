import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {Login} from "../components/Login"
import {Signup} from "../components/Signup";
import {AdminNavbar} from "../components/admin/AdminNavbar"
import {ArenaManagerNavbar} from "../components/arenamanager/ArenaManagerNavbar"
import {CoachNavbar} from "../components/coach/CoachNavbar"
import {PlayersNavbar} from "../components/players/PlayersNavbar"
import {Admindata} from "../components/admin/Admindata"
import { UseEffectDemo } from "../components/players/UseEffectDemo";
import CreateProductCompnent from "../components/admin/CreateProductCompnent";
import Home from "../components/Home";
import ManageArena from "../components/arenamanager/ManageArena";
import UpdateArena from "../components/arenamanager/UpdateArena";
import AddArena from "../components/arenamanager/AddArena";
import ManageCoach from "../components/coach/ManageCoach";
import UpdateCoach from "../components/coach/UpdateCoach";
import AddCoach from "../components/coach/AddCoach";
import ManageMaintenance from "../components/arenamanager/ManageMaintenance";
import AddMaintenance from "../components/arenamanager/AddMaintenance";
import UpdateMaintenance from "../components/arenamanager/UpdateMaintenance";
import ManageSlot from "../components/arenamanager/ManageSlot";
import AddSlot from "../components/arenamanager/AddSlot";
import UpdateSlot from "../components/arenamanager/UpdateSlot";
import ManageBooking from "../components/players/ManageBooking";
import AddBooking from "../components/players/AddBooking";
import UpdateBooking from "../components/players/UpdateBooking";
import ManageFeedback from "../components/admin/ManageFeedback";
import AddFeedback from "../components/admin/AddFeedback";
import UpdateFeddback from "../components/admin/UpdateFeddback";
import Dashboard from "../components/arenamanager/Dashboard";
import BookingRequests from "../components/arenamanager/BookingRequests";
import ManageMySession from "../components/coach/ManageMySession";
import ManageAvalibality from "../components/coach/ManageAvalibality";
import UpdateAvalibality from "../components/coach/UpdateAvalibality";
import AddAvalibality from "../components/coach/AddAvalibality";
import ManageRequestCoach from "../components/coach/ManageRequestCoach";
import ManageCoachEarning from "../components/coach/ManageCoachEarning";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Logout from "../components/Logout";
import Unauthorized from "../components/Unauthorized";
import ManageUsers from "../components/admin/ManageUsers";
import ManageAdminArenas from "../components/admin/ManageAdminArenas";
import AdminPricing from "../components/admin/AdminPricing";
import AdminReports from "../components/admin/AdminReports";
import PlayerHome from "../components/players/PlayerHome";
import BrowseArena from "../components/players/BrowseArena";
import PlayerPayments from "../components/players/PlayerPayments";
import PlayerProfile from "../components/players/PlayerProfile";











const router=createBrowserRouter([
    { path:"/login", element:<Login/> },
    { path:"/signup", element:<Signup/> },
    { path:"/forgot-password", element:<ForgotPassword/> },
    { path:"/reset-password/:token", element:<ResetPassword/> },
    { path:"/logout", element:<Logout/> },
    { path:"/unauthorized", element:<Unauthorized/> },
    { path:"/", element:<Home/> },

    
    { path:"/admin",element:<ProtectedRoute allowedRoles={["admin"]}><AdminNavbar/></ProtectedRoute>,
        children:[
            {path:"admindata",element:<Admindata/>},
            {path:"users",element:<ManageUsers/>},
            {path:"arenas",element:<ManageAdminArenas/>},
            {path:"pricing",element:<AdminPricing/>},
            {path:"reports",element:<AdminReports/>},
            {path:"createproduct",element:<CreateProductCompnent/>},
            {path:"feedback",element:<ManageFeedback/>,
                children:[
                    {path:"addfeedback",element:<AddFeedback/>},
                    {path:"updatefeedback/:id",element:<UpdateFeddback/>}
                ]
            }
        ]

     },
    { path:"/arenamanager",element:<ProtectedRoute allowedRoles={["arenamanager"]}><ArenaManagerNavbar/></ProtectedRoute>,
        children:[
            {path:"dashboard",element:<Dashboard/>},
            {path:"bookingrequests",element:<BookingRequests/>},
            {path:"arenas",element:<ManageArena/>,
                children:[
                    { path:"updatearena/:id",element:<UpdateArena/>},
                    { path:"createarena",element:<AddArena/>},
                ]
            },
            {path:"maintenance",element:<ManageMaintenance/>,
                children:[
                    {path:"addmaintenance",element:<AddMaintenance/>},
                    {path:"updatemaintenance/:id",element:<UpdateMaintenance/>},
                ]
            },
            {
                path:"schedule",element:<ManageSlot/>,
                children:[
                    {path:"addslot",element:<AddSlot/>},
                    {path:"updateslot/:id",element:<UpdateSlot/>},
                ]
            },
            {
                path: "coaches", element: <ManageCoach/>,
                children: [
                    { path: "createcoach", element: <AddCoach/> },
                    { path: "updatecoach/:id", element: <UpdateCoach/> }
                ]
            },
             {
                path: "availability", element: <ManageAvalibality/>,
                children: [
                    { path: "addavalibility", element: <AddAvalibality/> },
                    { path: "updateavalibility/:id", element: <UpdateAvalibality/> }
                ]
            },
            { path: "coach-earning", element: <ManageCoachEarning/> }

        ]
     },

    { path:"/coach",element:<ProtectedRoute allowedRoles={["coach"]}><CoachNavbar/></ProtectedRoute> ,
        children:[
            {path:"dashboard",element:<ManageRequestCoach/>},
            {path:"mysession",element:<ManageMySession/>},
            {path:"request",element:<ManageRequestCoach/>,
                children:[
                    {path:"allrequest",element:<ManageRequestCoach/>},
                ]
            }
        ]


    },

    { path:"/players",element:<ProtectedRoute allowedRoles={["player"]}><PlayersNavbar/></ProtectedRoute>,
        children:[
            {path:"home",element:<PlayerHome/>},
            {path:"arenas",element:<BrowseArena/>},
            {path:"payments",element:<PlayerPayments/>},
            {path:"profile",element:<PlayerProfile/>},
            {path:"useeffectdemo",element:<UseEffectDemo/>},
            {path:"addfeedback",element:<AddFeedback/>},
            {path:"booking",element:<ManageBooking/>,
                children:[
                    {path:"addbooking",element:<AddBooking/>},
                    {path:"updatebooking/:id",element:<UpdateBooking/>},
                ]
            }
          
        ]
           
     },
 
   


])
const appRouter=()=>{
    return <RouterProvider router={router}></RouterProvider>
}
export default appRouter