{/* Featured Products */}
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <h2 className="font-serif text-3xl font-bold text-center mb-10">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockProducts.slice(0, 4).map((product) => (
        <Card key={product.id} className="hover:shadow-md transition">
          <CardContent className="p-4">
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-muted-foreground mb-2">₹{product.price.toLocaleString()}</p>
            <Link href={`/products/${product.id}`}>
              <Button variant="secondary" className="w-full">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
