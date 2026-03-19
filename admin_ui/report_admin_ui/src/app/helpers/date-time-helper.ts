export class DateTimeHelper {
    static formatDateTo_DDmmYYY(date: Date): string {
        const delimiter:string = '-';
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}${delimiter}${month}${delimiter}${year}`;
    }
}
