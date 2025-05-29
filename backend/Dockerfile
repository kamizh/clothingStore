# СБОРКА
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем .csproj
COPY ./clothing-backend/clothingAPI/clothingAPI/clothingAPI.csproj ./clothingAPI/
RUN dotnet restore ./clothingAPI/clothingAPI.csproj

# Копируем весь проект
COPY ./clothing-backend/clothingAPI/clothingAPI ./clothingAPI
WORKDIR /src/clothingAPI

RUN dotnet publish clothingAPI.csproj -c Release -o /app/publish

# РАНТАЙМ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "clothingAPI.dll"]
