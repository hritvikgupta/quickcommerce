import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import { ChevronRight } from "lucide-react";

export default function SpooktacularSavings() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Spooktacular Savings</h2> {/* Dark text */}
        <Button variant="link" className="text-gray-800">
          Show all
          <ChevronRight className="ml-1 h-4 w-4 text-gray-800" />
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-600 rounded-md flex-shrink-0"></div>
            <div>
              <CardTitle className="text-gray-800">Target</CardTitle> {/* Dark text */}
              <p className="text-sm text-green-600">Delivery by 11:45am • 1.3 mi • $$</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-700 rounded-md flex-shrink-0"></div>
            <div>
              <CardTitle className="text-gray-800">CVS</CardTitle> {/* Dark text */}
              <p className="text-sm text-green-600">Delivery by 11:40am • 1.1 mi</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
