import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { stripe } from '../_shared/stripe.ts'

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  
  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')
    )
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        // Handle successful payment
        break
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    )
  }
})