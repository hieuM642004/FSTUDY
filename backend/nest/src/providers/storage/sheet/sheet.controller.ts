import { Controller, Get, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { google } from 'googleapis';

@Controller('google-sheets')
export class GoogleSheetsController {
  private readonly sheets;
  private readonly spreadsheetId = '1_YqlF-DWDpsOhv2KlFoKsE6bypYnkBvoRr9ZCIhtXxc';

  constructor() {
    const auth = new google.auth.JWT(
      'fstudy@nest-app-421201.iam.gserviceaccount.com',
      undefined,
      `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoxv59amShkCgY\n2I5URsTzvGz3iOVBnW1sNguHrAjjaaFS1vSIdvyblSeFieH62uhhCi3TRjlfjrTg\nke1xmAVJaQfU4/VHBbofWE2ID+AGWMm+oRHbnXfD3bUc/PeKMzDhbEBJeOtlNoQF\nHG6zhFVYQgxgLlNTC73q/fbBuBxICQVy/GY35uNSJB/AJ8iqHuK/HoYsp1vK/ysO\noYuZURrkTFBFajTWabwGl/Pi4FZiIS12A9eLf+4yn3LYvYt0EquigPO2TM63uWce\nZynoVRUbVgJaoasQUYJmh0HjDMnEA/8zT4iG5wY9lNuuo02ix9Jk7860ElrDwajH\nIepPISV1AgMBAAECggEAAVbu/yorLqMZG7VgT9KYo+ybcCLchaGiaYj2R3c57NV8\n9njb9ldSGEld8m/j5MdRr9onqfUf5ckZWMJKawE6DYPxZXhXt97CREHBqnJMehBr\nWCwpcEpMKzhPxIaiJQJ/VqgIIe0n78+NIF3s56zbC+PI+wcdxIYj1ZZ6xmfX2vSA\nEvgC+txywt65o/FH0Enw2B0OQEJONpUL7e++OgueWC129t3u41enc3VgImnIbTdO\nhIs9W9/KIAwLJi2ocfKKWWkLOq4QTeJyF/QeGNb7D2vU2OKoD/IMj/lkgWdBcpej\ncFjCO/xhiYz7UZJfZQQFKIhn21RF3RK1Or3rggBKkwKBgQDWRSwIaptojw7v0JXA\nW+rAScbc5GLYHb6ssmaVXsyun1xjyQ/5L+VyYRlXcpe9eUnvJ9nhz8rRhHyaueqz\nWAKMzGP0pY5kb4RDpo81BIto7KJPU2iRSqD8v6MGVlufG3sYwk3nJyct0Ofd3MbF\nD5qxBgLfQpT0eMXh9ChBj7qMDwKBgQDJpbE43wwtlXvLnmeU3LhLHbT9h/klpjvk\n+1seCGTlxEB8B8Ntd9LjJE79qQDnfW/w3X+5ToqKl5QGMPbK2go7kcHMQ4mETziD\nKKrmZHJdfJjTu0QeJsCYV5hzl08OWj2V+3MH8u1wnU6lH9ro2F2Ff0s8g2O2gdKy\ngbJrrYlCOwKBgHf+2QAFo+7UXwsShyrozvjM2F+QT4K0dboFVsnEA2Cvwm/ng9iL\naDW8BxMgC7aCnFMgwDZjxjO7vIRyJew2F4d+V2QE60933Fx+hKiuWNxz2RoPnfnw\nD2Q8djHwXvMl0rQ07KfNF3XjDlcDcxWc/Yax1R3vDbgzgq5dq8W7lj8lAoGBAI6i\nIkKdG0sfIqr8CD63BbE0eTKgvK5R8Kne1ivfOieAczCIeUb0a/p5U1p/8gDMrKLO\nuqrEEKFJ6M2cUuVX58cNKe0nlJ0/QDUeTgyb3n2cRan3G47MUI0x4MdarvPzBv8R\nFuP3hNaUnu2UI89yRGzKhthuA9kz6WqU7TTXUnDDAoGBAL5BR3S4OBZ5SsR1a0Tc\nM+hDWU7jMHpANP4pOLwlI/TI9L9KJfZvrWNNnVH4eYAL6bK0n8XerKK18FnhNZut\nN4C2IpOMEXp7jhcE7IWMly4LZYa7788Pi0hagQ4HqIxKL080JwFmx8bpt6oE9Qhh\nBwOwfUMXWpSDnpNzJS1PlqSd\n-----END PRIVATE KEY-----\n`,
      ['https://www.googleapis.com/auth/spreadsheets'],
    );

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  @Get()
  @Get()
  async getData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId, 
        range: 'fsyudy!A1:C', 
      });
  
      return response.data.values.map((row) => ({
        topic: row[0] || '',
        step: row[1] || '',
        response: row[2] || '',
      }));
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error.message);
      throw new Error(
        `Failed to fetch data from Google Sheets: ${
          error.response?.data?.error?.message || error.message
        }`,
      );
    }
  }
  

  @Post()
  async addRow(@Body() body: { topic: string; step: string; response: string }) {
    try {
      const { topic, step, response } = body;

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'fsyudy!A1:C',
        valueInputOption: 'RAW',
        resource: {
          values: [[topic, step, response]],
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding row to Google Sheets:', error);
      throw new Error('Failed to add row to Google Sheets');
    }
  }

  @Put()
  async updateRow(
    @Body() body: { rowIndex: number; topic: string; step: string; response: string },
  ) {
    try {
      const { rowIndex, topic, step, response } = body;

      const range = `fsyudy!A${rowIndex}:C${rowIndex}`;

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values: [[topic, step, response]],
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating row in Google Sheets:', error);
      throw new Error('Failed to update row in Google Sheets');
    }
  }

  @Delete()
  async deleteRow(@Query('rowIndex') rowIndex: number) {
    try {
      const request = {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex,
              },
            },
          },
        ],
      };

      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: request,
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting row from Google Sheets:', error);
      throw new Error('Failed to delete row from Google Sheets');
    }
  }
}
