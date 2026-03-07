import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';

const MOCK_BILL = {
  refNumber: 'UUID-9876-1',
  guestName: 'Sarah Jenkins',
  guestAddress: '123 Ocean Drive, London, UK W11 2BQ',
  contactNumber: '+44 7700 900077',
  roomName: 'Ocean View Deluxe',
  roomType: 'Deluxe',
  roomNumber: '101',
  floor: 5,
  checkIn: '2026-10-15',
  checkOut: '2026-10-20',
  nights: 5,
  pricePerNight: 300,
  totalCost: 1500,
  taxAmount: 150,
  grandTotal: 1650,
  status: 'CONFIRMED',
  issueDate: '2026-03-05'
};

const ReservationDetailPage = () => {
  const { id: _id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)] print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 lg:px-8 py-24 md:py-32 print:py-8 print:px-0 fade-up">
        
        {/* Actions Header (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 print:hidden gap-4">
           <Link to="/my-reservations" className="text-[var(--color-primary-deep)] text-sm font-medium hover:underline flex items-center">
             <span className="mr-2">←</span> Back to My Reservations
           </Link>
           <div className="flex space-x-4">
             {MOCK_BILL.status === 'PENDING' && (
               <Button variant="ghost" className="border-rose-300 gap-rose-500 hover:bg-rose-50" size="sm">
                 Cancel Reservation
               </Button>
             )}
             <Button variant="ghost" onClick={handlePrint} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>}>
               Download PDF / Print
             </Button>
           </div>
        </div>

        {/* Invoice / Bill Card */}
        <div className="bg-white rounded-none md:rounded-xl shadow-lg border border-gray-100 overflow-hidden print:shadow-none print:border-none relative">
          
          {/* Print Watermark */}
          {MOCK_BILL.status === 'CONFIRMED' && (
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-[-45deg] select-none">
              <span className="text-[12rem] font-bold tracking-widest text-[var(--color-accent-gold)]">CONFIRMED</span>
            </div>
          )}

          {/* Invoice Header */}
          <div className="bg-[var(--color-primary-deep)] text-white p-8 md:p-12 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
             <div>
               <div className="flex items-center space-x-2 mb-4">
                 <span className="text-3xl text-[var(--color-accent-gold)] font-serif">〰️</span>
                 <span className="text-3xl font-['Playfair_Display'] font-semibold drop-shadow-md">
                   OceanView Resort
                 </span>
               </div>
               <p className="text-gray-300 text-sm italic font-['Playfair_Display']">Galle Road, Galle, Sri Lanka</p>
               <p className="text-gray-300 text-sm">+1 (800) 123-4567 • reservations@oceanview.com</p>
             </div>

             <div className="mt-8 md:mt-0 text-left md:text-right">
                <h2 className="text-4xl font-['Playfair_Display'] text-[var(--color-accent-gold)] mb-2">INVOICE</h2>
                <p className="text-sm font-['Montserrat'] tracking-widest uppercase mb-1 flex items-center md:justify-end">
                  <span className="text-teal-400 mr-2">✓</span>
                  {MOCK_BILL.status}
                </p>
                <p className="text-xs text-gray-400 font-mono mt-4">Ref: {MOCK_BILL.refNumber}</p>
                <p className="text-xs text-gray-400 mt-1">Date: {MOCK_BILL.issueDate}</p>
             </div>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            {/* Split Details Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              
              {/* Guest Info */}
              <div>
                <h4 className="border-b-2 border-[var(--color-accent-gold)] pb-2 mb-4 text-xs font-['Montserrat'] font-bold tracking-widest text-[var(--color-primary-deep)] uppercase w-max">
                  Guest Information
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-bold text-gray-800 text-base">{MOCK_BILL.guestName}</p>
                  <p className="whitespace-pre-line leading-relaxed">{MOCK_BILL.guestAddress}</p>
                  <p className="mt-2 text-gray-500">{MOCK_BILL.contactNumber}</p>
                </div>
              </div>

              {/* Room & Stay Info */}
              <div>
                <h4 className="border-b-2 border-[var(--color-primary-deep)] pb-2 mb-4 text-xs font-['Montserrat'] font-bold tracking-widest text-gray-500 uppercase w-max flex items-center">
                  Reservation Details <span className="ml-2 text-[var(--color-accent-gold)]">Room {MOCK_BILL.roomNumber}</span>
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Room Type</span>
                    <span className="font-semibold text-gray-800">{MOCK_BILL.roomType}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Floor</span>
                    <span className="font-semibold text-gray-800">Level {MOCK_BILL.floor}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Check-in</span>
                    <span className="font-semibold text-gray-800">{MOCK_BILL.checkIn}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Check-out</span>
                    <span className="font-semibold text-gray-800">{MOCK_BILL.checkOut}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 text-xs font-['Montserrat'] font-bold tracking-widest text-gray-500 uppercase">Description</th>
                    <th className="py-4 px-6 text-xs font-['Montserrat'] font-bold tracking-widest text-gray-500 uppercase text-right">Qty</th>
                    <th className="py-4 px-6 text-xs font-['Montserrat'] font-bold tracking-widest text-gray-500 uppercase text-right">Rate</th>
                    <th className="py-4 px-6 text-xs font-['Montserrat'] font-bold tracking-widest text-gray-500 uppercase text-right bg-gray-100">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-800 block">{MOCK_BILL.roomName}</span>
                      <span className="text-gray-500 text-xs">Accommodation Charges</span>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-600">{MOCK_BILL.nights} nights</td>
                    <td className="py-4 px-6 text-right text-gray-600">${MOCK_BILL.pricePerNight}</td>
                    <td className="py-4 px-6 text-right font-medium text-gray-800 bg-gray-50">${MOCK_BILL.totalCost}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-600">Local Taxes & Fees</span>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-600">-</td>
                    <td className="py-4 px-6 text-right text-gray-600">10%</td>
                    <td className="py-4 px-6 text-right font-medium text-gray-800 bg-gray-50">${MOCK_BILL.taxAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Block */}
            <div className="flex justify-end mb-12">
              <div className="w-full md:w-1/2 lg:w-1/3 bg-[#FAF9F5] p-6 rounded-lg border border-[rgba(201,168,76,0.3)]">
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-200/50">
                   <span className="text-sm font-medium text-gray-600">Subtotal</span>
                   <span className="text-sm font-medium text-gray-800">${MOCK_BILL.totalCost}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-[rgba(201,168,76,0.4)]">
                   <span className="text-sm font-medium text-gray-600">Taxes</span>
                   <span className="text-sm font-medium text-gray-800">${MOCK_BILL.taxAmount}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-['Montserrat'] font-bold tracking-wider uppercase text-[var(--color-primary-deep)] text-sm">Total Due</span>
                  <span className="text-3xl font-['Playfair_Display'] font-bold text-[var(--color-accent-gold)]">${MOCK_BILL.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="text-center pt-8 border-t border-gray-100">
               <span className="text-2xl text-[var(--color-accent-gold)] mb-4 inline-block">〰️</span>
               <p className="text-gray-500 font-['Playfair_Display'] italic">We hope you enjoyed your stay at OceanView.</p>
               <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">This is a computer-generated invoice and does not require a physical signature. For billing inquiries, please contact our support desk.</p>
            </div>

          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ReservationDetailPage;
