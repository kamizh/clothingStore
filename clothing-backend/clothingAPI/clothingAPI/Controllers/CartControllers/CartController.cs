using clothingAPI.Data;
using clothingAPI.Dto;
using clothingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace clothingAPI.Controllers.CartControllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost("add")]
        public async Task<IActionResult> CartItemAdd([FromBody] SmallCartDto cartItem)
        {
            var currentUser = await _context.Users.FindAsync(cartItem.UserId);

            var currentProductVariant = await _context.ProductVariants.FindAsync(cartItem.ProductVariantId);

            if (currentUser == null || currentProductVariant == null)
                return NotFound();

            bool alreadyExists = await _context.CartItems
                .AnyAsync(elem =>
                    elem.ProductVariantId == cartItem.ProductVariantId &&
                    elem.UserId == cartItem.UserId);

            if (alreadyExists)
                return Ok(new { answer = true });

            var newCartItem = new CartItem
            {
                Count = 1,
                ProductVariant = currentProductVariant,
                ProductVariantId = currentProductVariant.Id,
                User = currentUser,
                UserId = currentUser.Id,
                Size = cartItem.CurrentSize
            };

            await _context.CartItems.AddAsync(newCartItem);
            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }


        [HttpPut("plus")]
        public async Task<IActionResult> CartitemPlus([FromQuery] int CartItemId)
        {
            CartItem currentCartItem = await _context.CartItems.FindAsync(CartItemId);

            if (currentCartItem == null)
                return NotFound();

            currentCartItem.Count += 1;

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpPut("minus")]
        public async Task<IActionResult> CartitemMinus(int CartItemId)
        {
            CartItem currentCartItem = await _context.CartItems.FindAsync(CartItemId);

            if (currentCartItem == null)
                return NotFound();

            if(currentCartItem.Count > 1)
                currentCartItem.Count -= 1;

            else
            {
                _context.CartItems.Remove(currentCartItem);
            }

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> CartItemDelete(int CartItemId)
        {
            CartItem currentCartItem = await _context.CartItems.FindAsync(CartItemId);

            if (currentCartItem == null)
                return NotFound();

            _context.CartItems.Remove(currentCartItem);

            await _context.SaveChangesAsync();

            return Ok(new {answer = true});
        }

        [HttpGet("everything")]
        public async Task<IActionResult> CartItemEverything(int UserId)
        {
            List<CartItem> currentCartItems = await _context.CartItems.Include(p => p.ProductVariant).ThenInclude(var => var.Color).Include(c => c.ProductVariant).ThenInclude(var => var.Images).Where(p => p.UserId == UserId).ToListAsync();

            if (!currentCartItems.Any())
                return NotFound();

            List<CartItemDto> cartItemDtos = new List<CartItemDto>();

            foreach(var cartitem in currentCartItems)
            {
                CartItemDto cartItemDto = new CartItemDto
                {
                    CartId = cartitem.Id,
                    Size = cartitem.Size,
                    Count = cartitem.Count,
                    ProductVariantId = cartitem.ProductVariantId,
                    Color = cartitem.ProductVariant.Color.Name,
                    Discount = cartitem.ProductVariant.Discount,
                    ImageUrl = cartitem.ProductVariant.Images.Select(img => img.Url).First(),
                    Price = cartitem.ProductVariant.Price,


                };
                cartItemDtos.Add(cartItemDto);
            }

            if (cartItemDtos.Count == 0)
                return NotFound();

            return Ok(cartItemDtos);


        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CartCreateOrder([FromBody] CartOfOrderDto cartItems)
        {
            var currentUser = await _context.Users.FindAsync(cartItems.UserId);
            if (currentUser == null) return NotFound();

            var currentCartItems = await _context.CartItems
                .Include(car => car.ProductVariant)
                .Where(car => cartItems.CartItems.Contains(car.Id))
                .ToListAsync();

            if (!currentCartItems.Any()) return NotFound();

            var newOrder = new Order
            {
                DateRegistration = DateTime.UtcNow,
                Email = currentUser.Email,
                Phone = cartItems.Phone,
                Price = cartItems.Price,
                UserId = currentUser.Id,
                User = currentUser,
            };

            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync(); 

            var orderItems = currentCartItems.Select(cartItem => new OrderItem
            {
                Count = cartItem.Count,
                Price = cartItem.ProductVariant.Price,
                ProductVariantId = cartItem.ProductVariantId,
                Size = cartItem.Size,
                OrderId = newOrder.Id 
            }).ToList();

            await _context.OrderItems.AddRangeAsync(orderItems);

            _context.CartItems.RemoveRange(currentCartItems);

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpGet("orders")]
        public async Task<IActionResult> Orders(int UserId)
        {
            var ordersItems = await _context.OrderItems.Include(or => or.Order).Include(or => or.ProductVariant).ThenInclude(or => or.Color).Include(or => or.ProductVariant).ThenInclude(pv => pv.Images).Where(ord => ord.Order.UserId == UserId).ToListAsync();

            if (ordersItems.Count == 0)
                return Ok(new { answer = false });

            List<OrderitemDto> orderItemsDtos = new List<OrderitemDto>();

            foreach(var item in ordersItems)
            {
                OrderitemDto dto = new OrderitemDto
                {
                    Id = item.Id,
                    Discount = item.ProductVariant.Discount,
                    Size = item.Size,
                    Color = item.ProductVariant.Color.Name,
                    Count = item.Count,
                    Price = item.Price,
                    ImageUrl = item.ProductVariant.Images.Select(img => img.Url).First(),
                };

                orderItemsDtos.Add(dto);
            }

            return Ok(orderItemsDtos);


        }




    }
}
