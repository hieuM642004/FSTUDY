import { nestApiInstance } from "@/constant/api";

class GoogleSheetsService {
    static async getAllRows() {
      try {
        const response = await nestApiInstance.get('/google-sheets');
        return response.data; 
      } catch (error) {
        console.error('Error fetching rows from Google Sheets:', error);
        return null;
      }
    }
  
    static async addRow(newRow: { topic: string; step: string; response: string }) {
      try {
        const response = await nestApiInstance.post('/google-sheets', newRow);
        return response.data;
      } catch (error) {
        console.error('Error adding row to Google Sheets:', error);
        return null;
      }
    }
  
    static async updateRow(
      rowIndex: number,
      updatedRow: { topic: string; step: string; response: string },
    ) {
      try {
        const response = await nestApiInstance.put('/google-sheets', {
          rowIndex,
          ...updatedRow,
        });
        return response.data;
      } catch (error) {
        console.error('Error updating row in Google Sheets:', error);
        return null;
      }
    }
  
    static async deleteRow(rowIndex: number): Promise<boolean> {
      try {
        await nestApiInstance.delete('/google-sheets', {
          params: { rowIndex },
        });
        return true;
      } catch (error) {
        console.error('Error deleting row from Google Sheets:', error);
        return false;
      }
    }
  }
  
  export default GoogleSheetsService;
  