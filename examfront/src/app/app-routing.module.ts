import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { GraphicsComponent } from './pages/home/graphics/graphics.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/quiz/view-quizzes/view-quizzes.component';
import { AddQuizzComponent } from './pages/admin/quiz/add-quizz/add-quizz.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { QuizComponent } from './pages/admin/quiz/quiz.component';
import { LoadQuizComponent } from './pages/user/user-dashboard/load-quiz/load-quiz.component';
import { TestResultComponent } from './pages/admin/test-result/test-result.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'graphics',
    component: GraphicsComponent,
    pathMatch:'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[adminGuard],
    children:[
      {
        path:'',
        component: WelcomeComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'categories',
        component:CategoryComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:QuizComponent
      },
      {
        path:'add-quizz',
        component:AddQuizzComponent
      },
      {
        path:'test-result',
        component:TestResultComponent
      },
    ]
  },
  {
      path: 'user-dashboard',
      component: UserDashboardComponent,
      canActivate:[normalGuard],
      children:[
        {
          path:':catId',
          component:LoadQuizComponent
        },
        {
          path:'profile',
          component: ProfileComponent
        }
      ]
  },
  {
    path: 'logout',
    component: LoginComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
