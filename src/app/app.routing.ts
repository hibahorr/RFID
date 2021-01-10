import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { LoginComponent } from './components/user/login';
import { RegisterComponent } from './components/user/register';

import {PostsListComponent} from "./components/post/posts-list/posts-list.component";

import { AuthGuard } from './helpers';
import {PostDetailsComponent} from "./components/post/post-details/post-details.component";
import {CreatePostComponent} from "./components/post/create-post/create-post.component";
import {EditComponent} from "./components/post/edit/edit.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {UserProfileUpdateComponent} from "./components/user/user-profile-update/user-profile-update.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsListComponent },
    { path: 'posts/new', component: CreatePostComponent },
    { path: 'posts/:id', component: PostDetailsComponent },
    { path: 'posts/edit/:id', component: EditComponent },
    { path: 'users/profile/:id', component: UserProfileComponent },
    { path: 'users/profile/update/:id', component: UserProfileUpdateComponent },
    { path: 'users/profile/deleteItem/:id', component: UserProfileUpdateComponent },


    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
