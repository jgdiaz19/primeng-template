import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, FilterService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

interface MonthlyPayment {
    name?: string;
    amount?: number;
    paid?: boolean;
    date?: string;
}

@Component({
    templateUrl: './banking.dashboard.component.html'
})
export class BankingDashboardComponent implements OnInit {

    chartData: any;

    usdChartData: any;
    btcChartData: any;
    poundChartData: any;

    chartOptions: any;

    dateRanges: any[] = [];

    dateRanges2: any[] = [];

    selectedDate: any;
    selectedDate2: any;
    cards: any[] = [];

    selectedCard: any;

    selectedAccount: any;

    filteredCountries: any[] = [];

    accounts: any;

    accountNumber: any;

    accountName: any;

    amount: any;

    selectedSubscription: any;

    filteredSubscriptions: any;

    subscriptions: any;

    subscriptionAccountNo: any;

    cols: any[] = [];

    transactions: any[] = [];

    items: MenuItem[] = [];

    pieData: any;

    pieOptions: any;

    displayBasic = false;

    msgs1: any;

    cardName: any;
    cardno: any;
    cardDate: any;
    cvv: any;

    subscription: Subscription;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private layoutService: LayoutService,
        private filterService: FilterService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initChart();
        });
    }
    ngOnInit() {
        this.msgs1 = [
            {
                severity: 'custom', detail: `👋 Hello! Welcome to Hit! Before start please complete your profile to
            know you better.`,
            }
        ];
        this.cards = [
            {
                logo: '../../../assets/layout/images/logo-freya-single.svg',
                cardNo: '5454-5454-9999-8888',
                validDate: '05/28',
                name: 'John Doe'
            },
            {
                logo: '../../../assets/layout/images/logo-freya-single.svg',
                cardNo: '5454-5454-9999-7777',
                validDate: '08/26',
                name: 'John Doe'
            },
        ]
        this.selectedCard = this.cards[0];
        this.dateRanges = [
            { name: 'Daily', code: 'DAY' },
            { name: 'Weekly', code: 'WEEK' },
            { name: 'Monthly', code: 'MONTH' },
        ]
        this.dateRanges2 = [
            { name: 'Last 7 Days', code: '7day' },
            { name: 'Last 30 Days', code: '30day' },
            { name: 'Last 90 Days', code: '90day' },
        ]

        this.selectedDate = this.dateRanges[2];

        this.accounts = [
            {
                photo: '../../../assets/demo/images/avatar/amyelsner.png',
                accountNo: '** 4848',
                name: 'Amy Elsner'
            },
            {
                photo: '../../../assets/demo/images/avatar/annafali.png',
                accountNo: '** 4848',
                name: 'Anna Fali'
            },
            {
                photo: '../../../assets/demo/images/avatar/bernardodominic.png',
                accountNo: '** 4848',
                name: 'Bernardo Dominic'
            },
            {
                photo: '../../../assets/demo/images/avatar/ivanmagalhaes.png',
                accountNo: '** 4848',
                name: 'Ivan Magalhaes'
            },
            {
                photo: '../../../assets/demo/images/avatar/stephenshaw.png',
                accountNo: '** 4848',
                name: 'Stephen Shaw'
            },

        ]

        this.transactions = [
            {
                image: '../../../assets/demo/images/avatar/amyelsner.png',
                accountNo: '** 4848',
                action: 'Bank Transfer',
                name: 'Amy Elsner',
                amount: 112.00
            },
            {
                image: '../../../assets/demo/images/avatar/annafali.png',
                accountNo: '** 4848',
                action: 'Bank Transfer',
                name: 'Anna Fali',
                amount: -112.00
            },
            {
                image: '../../../assets/demo/images/dashboard/brands/netflix-logo.png',
                accountNo: '** 4848',
                action: 'Subscription Payment',
                name: 'Netflix Subscription',
                amount: -48.00
            },
            {
                image: '',
                accountNo: '** 4848',
                action: 'Bill Payment',
                name: 'Electric Bill',
                amount: -48.00
            },
            {
                image: '../../../assets/demo/images/avatar/ivanmagalhaes.png',
                accountNo: '** 4848',
                action: 'Bank Transfer',
                name: 'Ivan Magalhaes',
                amount: -112.00
            },
            {
                image: '../../../assets/demo/images/avatar/stephenshaw.png',
                accountNo: '** 4848',
                action: 'Bank Transfer',
                name: 'Stephen Shaw',
                amount: 112.00
            }


        ]

        this.subscriptions = [
            {
                image: '',
                accountNo: '548268',
                name: 'Electric Bill',
                amount: 15,
                due: 'close'
            },
            {
                image: '../../../assets/demo/images/dashboard/brands/hbo-logo.png',
                accountNo: '845152848',
                name: 'TV Subscription',
                amount: 120,
                due: ''
            },
            {
                image: '../../../assets/demo/images/dashboard/brands/netflix-logo.png',
                accountNo: '659815523',
                name: 'Netflix Subscription',
                amount: 48,
                due: 'close'
            },
            {
                image: '../../../assets/demo/images/dashboard/brands/harvard-logo.png',
                accountNo: '*6585122',
                name: 'Education Payment',
                amount: 45,
                due: 'late'
            },

        ]

        this.items = [
            {
                icon: 'pi pi-refresh',
                label: 'Re-send or Pay'
            },

            {
                icon: 'pi pi-external-link',
                label: 'Details'
            },
            {
                icon: 'pi pi-download',
                label: 'Download doc'
            }

        ];
        this.initChart();


    }

    filterCountry(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.accounts.length; i++) {
            let country = this.accounts[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    filterSubscription(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.subscriptions.length; i++) {
            let country = this.subscriptions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredSubscriptions = filtered;
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Income',
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    tension: .4,
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    barThickness: 28
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                    fill: true,
                    backgroundColor: '#ff6e49a3',
                    tension: .4,
                    barThickness: 28
                }
            ]
        };

        this.usdChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Euro to US Dollar",
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [1.10, 1.12, 1.15, 1.18, 1.20, 1.25, 1.30],
                    barThickness: 10
                }
            ]
        };
        this.btcChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Bitcoin to US Dollar",
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [35000, 40000, 45000, 55000, 60000, 65000, 60000],
                    barThickness: 10
                }
            ]
        };
        this.poundChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "GBP to US Dollar",
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60],
                    barThickness: 10
                }
            ]
        };

        this.chartOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                        padding: 14,
                    }
                },
                tooltip: {
                    callbacks: {

                        label: function (context: any) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ':';
                            }

                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.pieData = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300'),
                        documentStyle.getPropertyValue('--orange-300'),
                        documentStyle.getPropertyValue('--green-300'),
                        documentStyle.getPropertyValue('--cyan-300')
                    ],
                    borderColor: surfaceBorder
                }
            ]
        };
        this.pieOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 14,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                    },
                    position: 'bottom'
                }
            }
        };
    }

    onDateChangeBarChart() {
        console.log(this.selectedDate)
        const documentStyle = getComputedStyle(document.documentElement);
        const monthlyData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Income',
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    tension: .4,
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    barThickness: 28
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                    fill: true,
                    backgroundColor: '#ff6e49a3',
                    tension: .4,
                    barThickness: 28
                }
            ]
        };
        const dailyData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: 'Income',
                    data: [1000, 800, 1000, 1300, 1200, 1000, 800],
                    fill: false,
                    tension: .4,
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    barThickness: 16
                },
                {
                    label: 'Expenses',
                    data: [800, 700, 600, 1050, 700, 800, 900],
                    fill: true,
                    backgroundColor: '#ff6e49a3',
                    tension: .4,
                    barThickness: 16
                }
            ]
        };
        const weeklyData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4',],
            datasets: [
                {
                    label: 'Income',
                    data: [7000, 8000, 5000, 7500],
                    fill: false,
                    tension: .4,
                    backgroundColor: documentStyle.getPropertyValue('--green-400'),
                    barThickness: 32
                },
                {
                    label: 'Expenses',
                    data: [5500, 6000, 2500, 5000],
                    fill: true,
                    backgroundColor: '#ff6e49a3',
                    tension: .4,
                    barThickness: 32
                }
            ]
        };

        let newBarData = { ...this.chartData };
        switch (this.selectedDate.name) {
            case 'Monthly':
                newBarData = monthlyData;
                break;
            case 'Weekly':
                newBarData = weeklyData;
                break;
            case 'Daily':
                newBarData = dailyData;
                break;
            default:
                break;


        }

        this.chartData = newBarData;

    }

    onDateChangePieChart() {
        console.log(this.selectedDate2)
        const documentStyle = getComputedStyle(document.documentElement);
        const last30Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300'),
                        documentStyle.getPropertyValue('--orange-300'),
                        documentStyle.getPropertyValue('--green-300'),
                        documentStyle.getPropertyValue('--cyan-300')
                    ]
                }
            ]
        };
        const last7Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [450, 50, 200, 120],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300'),
                        documentStyle.getPropertyValue('--orange-300'),
                        documentStyle.getPropertyValue('--green-300'),
                        documentStyle.getPropertyValue('--cyan-300')
                    ]
                }
            ]
        };
        const last90Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [30, 200, 150, 20],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300'),
                        documentStyle.getPropertyValue('--orange-300'),
                        documentStyle.getPropertyValue('--green-300'),
                        documentStyle.getPropertyValue('--cyan-300')
                    ]
                }
            ]
        };

        let newPieData = { ...this.pieData };
        switch (this.selectedDate2.code) {
            case '7day':
                newPieData = last7Data;
                break;
            case '30day':
                newPieData = last30Data;
                break;
            case '90day':
                newPieData = last90Data;
                break;
            default:
                break;
        }

        this.pieData = newPieData;

    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    addCreditCard() {

        const card = {
            logo: '../../../assets/layout/images/logo-freya-single.svg',
            cardNo: this.cardno,
            validDate: this.cardDate,
            name: this.cardName
        }
        this.cards.push(card);
        this.displayBasic = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    confirm1(name: any, amount: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to send $' + amount + ' to ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You sent $' + amount + ' to ' + name });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your transaction rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Your transaction canceled' });
                        break;
                }
            }
        });
    }

    confirm2(name: any, amount: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to pay $' + amount + ' for your ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You paid $' + amount + ' for your ' + name });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Your transaction rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Your transaction canceled' });
                        break;
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
