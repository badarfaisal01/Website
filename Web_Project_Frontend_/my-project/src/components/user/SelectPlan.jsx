import React, { useState } from 'react';

const PlanSelection = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        { id: 1, name: 'Basic', price: '$10/month', features: ['Feature 1', 'Feature 2'] },
        { id: 2, name: 'Standard', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
        { id: 3, name: 'Premium', price: '$30/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Select Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map(plan => (
                    <div key={plan.id} className={`border p-4 rounded-lg cursor-pointer transition duration-300 ${selectedPlan === plan.id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`} onClick={() => setSelectedPlan(plan.id)}>
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        <p className="text-lg">{plan.price}</p>
                        <ul className="mt-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="text-gray-700">{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button className={`mt-4 px-4 py-2 text-white rounded ${selectedPlan ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`} disabled={!selectedPlan}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default PlanSelection;