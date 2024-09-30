import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChatComponent } from './components/sections/chat/chat.component';
import { ChatContactsComponent } from './components/sections/chat-contacts/chat-contacts.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code.component';
export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'verify-code', component: VerifyCodeComponent},
    { path: 'chat', component: ChatComponent},

    { path: '**', component: NotFoundComponent}
];
