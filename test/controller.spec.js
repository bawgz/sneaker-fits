const controller = require('../app/controller');

jest.mock('../app/data-access');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body, query) => {
  return { body, query };
};
describe('test true to size calculation', () => {
  test('happy path', async () => {
    const res = mockResponse();
    await controller.calculateTrueToSizeAvg(mockRequest(null, { sneakers: "Adidas Yeezy" }), res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ true_to_size_calculation: 4 });
  });

  test('sneakers not found', async () => {
    const res = mockResponse();
    await controller.calculateTrueToSizeAvg(mockRequest(null, { sneakers: "Nike Air Monarchs" }), res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ error: "Sneakers not found" });
  });
});

describe('test submit new true to size rating entry', () => {
  test('happy path', async () => {
    const res = mockResponse();
    await controller.submitTrueToSizeRating(mockRequest({ sneakers: "Adidas Yeezy", true_to_size_rating: 3 }), res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ id: expect.anything(), sneakers: "Adidas Yeezy", true_to_size_rating: 3 });
  });

  test('rating too low', async () => {
    const res = mockResponse();
    await controller.submitTrueToSizeRating(mockRequest({ sneakers: "Adidas Yeezy", true_to_size_rating: 0 }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "true_to_size_rating must be a number between 1 and 5" });
  });

  test('rating too high', async () => {
    const res = mockResponse();
    await controller.submitTrueToSizeRating(mockRequest({ sneakers: "Adidas Yeezy", true_to_size_rating: 6 }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "true_to_size_rating must be a number between 1 and 5" });
  });

  test('rating as text', async () => {
    const res = mockResponse();
    await controller.submitTrueToSizeRating(mockRequest({ sneakers: "Adidas Yeezy", true_to_size_rating: "abc" }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "true_to_size_rating must be a number between 1 and 5" });
  });

  test('sneakers not as string', async () => {
    const res = mockResponse();
    await controller.submitTrueToSizeRating(mockRequest({ sneakers: 13, true_to_size_rating: 3 }), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "sneakers must be a non-empty string" });
  });
});