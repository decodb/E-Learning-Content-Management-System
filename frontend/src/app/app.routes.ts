import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AdminComponent } from './pages/dashboards/admin/admin.component';
import { LecturersComponent } from './pages/dashboards/admin/lecturers/lecturers.component';
import { SettingsComponent } from './pages/dashboards/admin/settings/settings.component';
import { authGuard } from './guards/auth/auth.guard';
import { AddLecturerComponent } from './pages/dashboards/admin/lecturers/add-lecturer/add-lecturer.component';
import { CoursesComponent } from './pages/dashboards/admin/courses/courses.component';
import { UpdateSettingsComponent } from './pages/dashboards/admin/settings/update-settings/update-settings.component';
import { AddCourseComponent } from './pages/dashboards/admin/courses/add-course/add-course.component';
import { ChangePasswordComponent } from './pages/dashboards/admin/change-password/change-password.component';
import { LecturerComponent } from './pages/dashboards/lecturer/lecturer.component';
import { adminGuard } from './guards/admin/admin.guard';
import { lecturerGuard } from './guards/lecturer/lecturer.guard';
import { ModulesComponent } from './pages/dashboards/lecturer/modules/modules.component';
import { ProfileComponent } from './pages/dashboards/lecturer/profile/profile.component';
import { ModuleComponent } from './pages/dashboards/lecturer/module/module.component';
import { CourseContentComponent } from './pages/dashboards/lecturer/module/course-content/course-content.component';
import { AssessmentsComponent } from './pages/dashboards/lecturer/module/assessments/assessments.component';
import { ReviewsComponent } from './pages/dashboards/lecturer/module/reviews/reviews.component';
import { StudentsComponent } from './pages/dashboards/lecturer/module/students/students.component';
import { AddStudentComponent } from './pages/dashboards/lecturer/module/students/add-student/add-student.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: SignInComponent,
        title: 'E-Leaning | Sign in',
        
    }, 
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: 'dashboard/admin',
        component: AdminComponent,
        title: 'E-Learning | Admin',
        canActivate: [authGuard, adminGuard],
        children: [
            {
                path: 'courses',
                component: CoursesComponent,
                children: [
                    {
                        path: 'add',
                        component: AddCourseComponent
                    }
                ]
            },
            {
                path: 'lecturers',
                component: LecturersComponent,
                children: [
                    {
                        path: 'add',
                        component: AddLecturerComponent
                    }
                ]
            },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    {
                        path: 'update',
                        component: UpdateSettingsComponent
                    },
                    {
                        path: 'changePassword',
                        component: ChangePasswordComponent
                    }
                ]
            },
            {
                path: 'changePassword',
                component: ChangePasswordComponent
            }
        ]
    },
    {
        path: 'dashboard/lecturer',
        component: LecturerComponent,
        title: 'E-Learning | Lecturer',
        canActivate: [authGuard,lecturerGuard],
        children: [
            {
                path: 'modules',
                component: ModulesComponent,
            },
            {
                path: 'modules/:id',
                component: ModuleComponent,
                children: [
                    {
                        path: 'content',
                        component: CourseContentComponent,
                    },
                    {
                        path: 'assessments',
                        component: AssessmentsComponent, 
                    },
                    {
                        path: 'reviews',
                        component: ReviewsComponent
                    },
                    {
                        path: 'students',
                        component: StudentsComponent,
                        children: [
                            {
                                path: 'add',
                                component: AddStudentComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    }
];
