<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const SUPABASE_URL = 'https://doovevgkmarozjululkr.supabase.co'
const SUPABASE_KEY = 'sb_publishable__4GnPe_yN856H6ruK8FzGg_N17u7Tbo'
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

async function addProduct() {
  const photoUrl = document.getElementById('photoUrl').value.trim()
  const price = parseFloat(document.getElementById('price').value)
  const description = document.getElementById('desc').value.trim()
  
  if(!photoUrl || !price || !description) {
    alert('Remplis tout stp')
    return
  }

  const { error } = await supabase.from('products').insert([{photoUrl, price, description}])
  
  if(error) {
    alert('Erreur: ' + error.message)
    console.log(error)
  } else {
    alert('Produit ajouté ✅')
    document.getElementById('photoUrl').value = ''
    document.getElementById('price').value = ''
    document.getElementById('desc').value = ''
    loadProducts()
  }
}

async function loadProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', {ascending: false})
  
  if(error) {
    console.log(error)
    return
  }
  
  document.getElementById('list').innerHTML = data.map(p => `
    <div class="card">
      <img src="${p.photoUrl}">
      <h3>${p.price} FC</h3>
      <p>${p.description}</p>
    </div>
  `).join('')
}

loadProducts()
</script>
