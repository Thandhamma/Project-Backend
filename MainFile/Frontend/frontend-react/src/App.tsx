// 1.import
import React from 'react';
import './index.css';
import RoutingApp from './conponents/RoutingApp';
// 2.Create Main component - App
function App() {
 // Level 0 : App
 return (
 <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
 <RoutingApp />
 </div>
 );
}
// 3.export
export default App;