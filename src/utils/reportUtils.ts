
import { mockPayments, mockReservations, mockClients, mockVehicles } from '@/data/mockData';

export const generatePaymentsReport = () => {
  const reportData = mockPayments.map(payment => {
    const reservation = mockReservations.find(r => r.id === payment.reservationId);
    const client = mockClients.find(c => c.id === reservation?.clientId);
    
    return {
      'Cod Plată': payment.code,
      'Client': client?.name || 'Client Necunoscut',
      'Email': client?.email || 'N/A',
      'Rezervare': reservation?.code || 'N/A',
      'Sumă (RON)': payment.amount,
      'Metodă': payment.method === 'card' ? 'Card' : payment.method === 'cash' ? 'Numerar' : 'Transfer',
      'Status': payment.status === 'completed' ? 'Finalizată' : payment.status === 'pending' ? 'În așteptare' : payment.status === 'failed' ? 'Eșuată' : 'Rambursată',
      'Data': payment.createdAt
    };
  });

  return reportData;
};

export const generateReportsData = () => {
  const totalRevenue = mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const totalReservations = mockReservations.length;
  const utilizationRate = ((mockVehicles.filter(v => v.status === 'rented').length / mockVehicles.length) * 100).toFixed(1);

  const statusData = mockReservations.reduce((acc, reservation) => {
    const romanianStatus = reservation.status === 'pending' ? 'În așteptare' : 
                          reservation.status === 'confirmed' ? 'Confirmată' :
                          reservation.status === 'active' ? 'Activă' :
                          reservation.status === 'completed' ? 'Finalizată' : 'Anulată';
    acc[romanianStatus] = (acc[romanianStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandData = mockVehicles.reduce((acc, vehicle) => {
    acc[vehicle.brand] = (acc[vehicle.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    summary: {
      'Venituri Totale (RON)': totalRevenue.toLocaleString(),
      'Total Rezervări': totalReservations,
      'Rata Utilizare Flotă (%)': utilizationRate,
      'Data Generare': new Date().toLocaleDateString('ro-RO')
    },
    statusDistribution: statusData,
    brandDistribution: brandData,
    topClients: mockClients.slice(0, 5).map((client, index) => {
      const clientReservations = mockReservations.filter(r => r.clientId === client.id).length;
      return {
        'Poziție': index + 1,
        'Nume Client': client.name,
        'Email': client.email,
        'Număr Rezervări': clientReservations
      };
    })
  };
};

export const downloadCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPDF = (data: any, filename: string) => {
  // Create a simple HTML report
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Raport ${filename}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .summary { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h1>Raport Companie - ${new Date().toLocaleDateString('ro-RO')}</h1>
      
      <div class="summary">
        <h2>Sumar Executiv</h2>
        ${Object.entries(data.summary).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('')}
      </div>
      
      <h2>Distribuția Statusurilor Rezervărilor</h2>
      <table>
        <tr><th>Status</th><th>Număr</th></tr>
        ${Object.entries(data.statusDistribution).map(([status, count]) => `<tr><td>${status}</td><td>${count}</td></tr>`).join('')}
      </table>
      
      <h2>Distribuția Mărcilor Vehiculelor</h2>
      <table>
        <tr><th>Marcă</th><th>Număr Vehicule</th></tr>
        ${Object.entries(data.brandDistribution).map(([brand, count]) => `<tr><td>${brand}</td><td>${count}</td></tr>`).join('')}
      </table>
      
      <h2>Top 5 Clienți</h2>
      <table>
        <tr><th>Poziție</th><th>Nume Client</th><th>Email</th><th>Număr Rezervări</th></tr>
        ${data.topClients.map((client: any) => `<tr><td>${client['Poziție']}</td><td>${client['Nume Client']}</td><td>${client['Email']}</td><td>${client['Număr Rezervări']}</td></tr>`).join('')}
      </table>
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.html`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
