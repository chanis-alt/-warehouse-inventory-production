import React, { useState, useEffect } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';

export default function WarehouseInventory() {
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Données extraites du fichier Excel (colonne bleu clair)
    const warehouseData = [
      { id: '2621-197A', color: 'מילק milk', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-197B', color: 'שחור black', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-197C', color: 'בז beige', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-197D', color: 'נייבי navy', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-197E', color: 'כחול blue', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-197F', color: 'שחור טקסטורה tex.black', description: 'מכנס ארוך שבת', quantity: 121 },
      { id: '2621-198', color: 'שחור black', description: 'מכנס ג\'רזי ארוך', quantity: 121 },
      { id: '2621-200A', color: 'גינס כהה d.jeans', description: 'חצאית ג\'ינס סטרצי כיווצים', quantity: 116 },
      { id: '2621-200B', color: 'גינס בהיר lt.jeans', description: 'חצאית ג\'ינס סטרצי כיווצים', quantity: 116 },
      { id: '2621-202A', color: 'גינס כהה d.jeans', description: 'חצאית ג\'ינס סטרצי ארוכה', quantity: 114 },
      { id: '2621-202B', color: 'גינס בהיר lt.jeans', description: 'חצאית ג\'ינס סטרצי ארוכה', quantity: 114 },
      { id: '2621-204A', color: 'גינס כהה d.jeans', description: 'טייץ קצר גינס סטרצי', quantity: 122 },
      { id: '2621-204B', color: 'גינס בהיר lt.jeans', description: 'טייץ קצר גינס סטרצי', quantity: 122 },
      { id: '2621-206A', color: 'גינס כהה d.jeans', description: 'טייץ ארוך גינס סטרצי', quantity: 122 },
      { id: '2621-206B', color: 'גינס בהיר lt.jeans', description: 'טייץ ארוך גינס סטרצי', quantity: 122 },
      { id: '2621-4194B', color: 'מילק milk', description: 'חולצה גברית בנים אוקספורד', quantity: 116 },
      { id: '2621-4195', color: 'מילק milk', description: 'חולצה צוארון סיני ש.א.', quantity: 112 },
      { id: '2623-260A', color: 'לבן white', description: 'חולצה בייסיק שרוול קצר', quantity: 111 },
      { id: '2623-260B', color: 'מילק milk', description: 'חולצה בייסיק שרוול קצר', quantity: 111 },
      { id: '2623-262A', color: 'לבן white', description: 'בגד גוף ביסיק', quantity: 105 },
      { id: '2623-262B', color: 'מילק milk', description: 'בגד גוף ביסיק', quantity: 105 },
      { id: '2624-290A', color: 'שחור black', description: 'מכנס יומיום ארוך', quantity: 129 },
      { id: '2624-290B', color: 'נייבי navy', description: 'מכנס יומיום ארוך', quantity: 129 },
      { id: '2624-290D', color: 'גינס כהה d.jeans', description: 'מכנס יומיום ארוך', quantity: 129 },
      { id: '2624-290E', color: 'גינס שחור black jeans', description: 'מכנס יומיום ארוך', quantity: 129 },
      { id: '2625-302A', color: 'גינס מדיום m.jeans', description: 'חצאית כפתורים גינס כחול', quantity: 114 },
      { id: '2625-302B', color: 'לבן white', description: 'חצאית כפתורים גינס לבן', quantity: 114 }
    ];

    setProducts(warehouseData);
  }, []);

  const filteredProducts = products.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCheck = (id) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const downloadList = () => {
    const checkedProducts = products.filter(p => checkedItems.has(p.id));
    const csvContent = [
      ['מס\' דגם', 'צבע', 'תיאור', 'כמות'].join(','),
      ...checkedProducts.map(p => 
        [`"${p.id}"`, `"${p.color}"`, `"${p.description}"`, p.quantity].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'warehouse_list.csv');
    link.click();
  };

  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const checkedQuantity = products
    .filter(p => checkedItems.has(p.id))
    .reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📦 טבלת יצור - מחסן</h1>
          <p className="text-gray-600">בחר את הפריטים להורדה לטבלת ההזמנה</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600">סה״כ פריטים</div>
            <div className="text-3xl font-bold text-blue-600">{products.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-600">סה״כ כמות</div>
            <div className="text-3xl font-bold text-green-600">{totalQuantity}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <div className="text-sm text-gray-600">נבחר</div>
            <div className="text-3xl font-bold text-purple-600">{checkedItems.size}</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="חיפוש לפי מס׳ דגם, צבע או תיאור..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        {/* Download Button */}
        {checkedItems.size > 0 && (
          <div className="mb-6">
            <button
              onClick={downloadList}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Download size={20} />
              הורד {checkedItems.size} פריטים ({checkedQuantity} יחידות)
            </button>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-right">בחר</th>
                  <th className="px-4 py-3 text-right">מס׳ דגם</th>
                  <th className="px-4 py-3 text-right">צבע</th>
                  <th className="px-4 py-3 text-right">תיאור</th>
                  <th className="px-4 py-3 text-center">כמות</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`border-b transition ${
                      checkedItems.has(product.id)
                        ? 'bg-blue-100'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 text-right">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(product.id)}
                        onChange={() => toggleCheck(product.id)}
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {product.id}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {product.color}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {product.description}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded">
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <AlertCircle size={24} className="text-gray-400 mr-2" />
              <span className="text-gray-500">אין תוצאות חיפוש</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-800 mb-4">סיכום</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">סה״כ כמות (כל הפריטים)</p>
              <p className="text-2xl font-bold text-blue-600">{totalQuantity}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">כמות נבחרת להורדה</p>
              <p className="text-2xl font-bold text-green-600">{checkedQuantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
