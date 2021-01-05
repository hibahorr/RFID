import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

import { AlertService } from '../shared';
import {NotificationMessage, NotificationType} from "../model/NotificationMessage";
import {ToastrService} from "ngx-toastr";

@Component({ selector: 'alert', templateUrl: 'alert.component.html'})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

    sendMessage(message: NotificationMessage){
        this.notificationSubject.next(message);
    }

    constructor(private alertService: AlertService, private  toastrService: ToastrService) {

        // @ts-ignore
        this.notificationSubject._subscribe((message: { type: any; message: string; }) => {
            switch (message.type){
                case NotificationType.success:
                    this.toastrService.success(message.message);
                    break;
                case NotificationType.error:
                    this.toastrService.error(message.message);
                    break;
                case NotificationType.warning:
                    this.toastrService.warning(message.message);
                    break;
                case NotificationType.info:
                    this.toastrService.info(message.message);
                    break;
                default:
                case NotificationType.info:
                    this.toastrService.info(message.message);
                    break;
            }
        })
    }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
