"use client"

import { useState, useEffect } from "react"
import { Check, Copy, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PixCheckout() {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  const pixCode = "00020126500014BR.GOV.BCB.PIX0128erickgabrieldpi611@gmail.com5204000053039865406117.005802BR5905Erick6009Sao Paulo62120508Ingresso6304866D"

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">Etapa 3 de 3</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">Escaneie este código para pagar</h2>

            <div className="flex justify-center">
              <img src="/placeholder.svg?height=200&width=200" alt="QR Code PIX" className="w-48 h-48" />
            </div>

            <p className="text-2xl font-bold text-center">R$ 170,00</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Ou você também pode usar o código</h3>

            <ol className="space-y-2 list-decimal pl-4">
              <li>Abra seu Internet Banking ou App de Pagamentos</li>
              <li>Escolha a opção de "pagar via PIX"</li>
              <li>Cole o código abaixo:</li>
            </ol>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <code className="flex-1 text-sm break-all">{pixCode}</code>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {copied && <p className="text-sm text-green-600 text-center">Código copiado com sucesso!</p>}
          </div>

          <div className="space-y-4">
            <p className="font-medium text-center">
              Você tem <span className="text-orange-500">{formatTime(timeLeft)}</span> para efetuar o pagamento.
            </p>

            <Alert variant="info" className="bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Caso o pagamento não seja realizado no tempo estipulado, sua compra será cancelada.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

